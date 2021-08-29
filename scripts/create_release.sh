echo "[CI] Completando o repositorio para executar o processo"  
IS_SHALLOW=$(git rev-parse --is-shallow-repository)
if $IS_SHALLOW; then
git fetch --unshallow
fi
git fetch --all

VERSION=$(git tag --sort=-v:refname | grep "^v\?[0-9]\{1,\}-[0-9]\{1,\}-[0-9]\{1,\}$" | head -1)

: "${VERSION:?Tag with pattern vX-X-X or X.X.X not found.}"

[[ "${VERSION:0:1}" == "v" ]] && VERSION=${VERSION:1}

IFS='-' read -a VERSION_ARRAY <<< "$VERSION"

MAJOR=${VERSION_ARRAY[0]}
MINOR=${VERSION_ARRAY[1]}
PATCH=${VERSION_ARRAY[2]}

if [ "$1" == "major" ]; then
NEW_MAJOR=$(($MAJOR+1))
VERSION="$NEW_MAJOR.0.0"
fi
if [ "$1" == "minor" ]; then
NEW_MINOR=$(($MINOR+1))
VERSION="$MAJOR.$NEW_MINOR.0"
fi

VERSION_HYPHEN=$(echo "v$VERSION" | sed "s/\.\([[:digit:]]\)/-\1/g")


echo "Creating release branch"
git checkout -B release/$VERSION_HYPHEN

echo "Updating files"

DATE=$(date +%d\/%m\/%Y)

[[ $(grep --count "{version}" CHANGELOG.md) -ne 1 ]] && echo "Placeholder {version} not defined in CHANGELOG.md"
[[ $(grep --count "{date}" CHANGELOG.md) -ne 1 ]] && echo "Placeholder {date} not defined in CHANGELOG.md"
[[ $(grep --fixed-strings --count "# $VERSION" CHANGELOG.md) -ne 0 ]] && echo "Version $VERSION already defined in CHANGELOG.md"

sed -i 's/{version}/'"$VERSION"'/' CHANGELOG.md
sed -i 's!{date}!'"$DATE"'!' CHANGELOG.md

npm version --no-git-tag-version "$VERSION"

git commit -a -m "Criando versão $VERSION"

CI_REPOSITORY_URL_FOR_PUSH=$(echo "$CI_REPOSITORY_URL" | sed "s/.*@git\.senior\.com\.br\//git@git\.senior\.com\.br:/g")
git remote set-url --push origin "$CI_REPOSITORY_URL_FOR_PUSH"

echo "Pushing release branch"
git push origin release/$VERSION_HYPHEN