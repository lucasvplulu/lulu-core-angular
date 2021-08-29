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

NEW_PATCH=$(($PATCH+1))
VERSION=$MAJOR.$MINOR.$NEW_PATCH

VERSION_HYPHEN=$(echo "v$VERSION" | sed "s/\.\([[:digit:]]\)/-\1/g")

echo "Creating hotfix branch"
git checkout .
git checkout master

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$CURRENT_BRANCH" != "master" ]]; then
  echo 'Aborting script - Could not switch to master branch';
  exit 1;
fi

git checkout -B hotfix/$VERSION_HYPHEN

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

echo "Pushing hotfix branch"
git push origin hotfix/$VERSION_HYPHEN
