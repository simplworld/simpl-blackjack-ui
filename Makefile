.PHONY: rebuild

rebuild:
	docker-compose rm -f ui
	docker-compose build --force-rm ui

shell:
	docker-compose run --rm ui bash

compile:
	docker-compose exec ui NODE_ENV=production npm run compile