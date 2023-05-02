PYTHON = "./env/bin/python"
PIP = "./env/bin/pip"

run:
	make -j 2 watchcss runserver
.PHONY: run

buildcss:
	tailwindcss -o static/css/build.css --minify

watchcss:
	tailwindcss -o static/css/build.css --minify --watch
.PHONY: watchcss

activate:
	source env/bin/activate

makemigrations:
	$(PYTHON) manage.py makemigrations

migrate:
	$(PYTHON) manage.py migrate

freeze:
	$(PIP) freeze > requirements.txt

runserver:
	$(PYTHON) manage.py runserver
.PHONY: runserver