build:  # builds for the current platform
	${CURDIR}/node_modules/.bin/tsc -p .

clean:  # Removes all build artifacts
	rm -rf dist

doc: build  # runs the documentation tests
	${CURDIR}/node_modules/.bin/text-run static --format=summary
	${CURDIR}/node_modules/.bin/text-run dynamic --format=progress

fix:  # runs the auto-fixers
	${CURDIR}/node_modules/.bin/eslint . --fix --ext .ts --ignore-path ../.eslintignore
	dprint format

help:  # prints all make targets
	cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:  # lints all files in this codebase
	dprint check
	${CURDIR}/node_modules/.bin/eslint . --ext .ts --ignore-path ../.eslintignore
	${CURDIR}/node_modules/.bin/depcheck --config=../.depcheckrc

publish: clean build  # publishes this package
	npm publish

unit:  # runs the unit tests
	${CURDIR}/node_modules/.bin/mocha --reporter dot "test/*.test.ts"


.DEFAULT_GOAL := help
.SILENT:
