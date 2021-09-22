.PHONY: up
up:
	docker-compose up --build -d

.PHONY: down
down:
	docker-compose down	

.PHONY: restart
restart:
	make down
	make up

.PHONY: logs
logs:
	docker-compose logs -f