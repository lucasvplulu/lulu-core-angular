#! /usr/bin/env python3

import os
import sys

def get_current_branch():
    return sys.argv[1]

if __name__ == "__main__":
    with open('CHANGELOG.md', 'r', encoding='utf-8') as changelog:
        data = [line for line in changelog.readlines()]

    curr_branch = get_current_branch()
    print("on branch {}".format(curr_branch))
    branch_split = curr_branch.split("/")
    issue_code = branch_split[-1]

    search_string = issue_code.upper()

    print("buscando {}".format(search_string))

    for line in data:
        if search_string in line:
            print("Changelog OK")
            exit(0)
    
    print("Changelog nao encontrado")
    exit(1)
