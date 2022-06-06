.PHONY: start reset stop reset-restart build restart-rebuild
start:
	docker compose up -d

build:
	docker compose build

stop:
	docker compose stop

reset:
	docker compose down
	rm -rf mongo_data
	rm -rf backend_data

reset-restart: reset start

restart-rebuild: stop build start