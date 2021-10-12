build:  # builds for the current platform
	${CURDIR}/node_modules/.bin/tsc -p .

clean:  # Removes all build artifacts
	rm -rf dist

fix:  # runs the auto-fixers
	${CURDIR}/node_modules/.bin/eslint . --fix --ext .ts
	dprint fmt

help:  # prints all make targets
	cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:  # lints all files in this codebase
	${CURDIR}/node_modules/.bin/eslint . --ext .ts & \
	dprint check & \
	wait

publish: clean build  # publishes this package
	npm publish

setup:  # prepares this codebase for work after cloning
	yarn

test: # runs all tests
	${CURDIR}/node_modules/.bin/eslint . --ext .ts & \
	${CURDIR}/node_modules/.bin/mocha --reporter=dot "test/*.test.ts" & \
	dprint check & \
	wait
.PHONY: test

unit:  # runs the unit tests
	${CURDIR}/node_modules/.bin/mocha "test/*.test.ts"

update:  # updates to the latest dependencies
	yarn upgrade --latest


.DEFAULT_GOAL := help
.SILENT:
