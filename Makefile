create:
	docker run --name mysql -d \
        -p 3306:3306 \
        --restart unless-stopped \
        -v /Users/maksim/Documents/Storm/babysitter-bd:/var/lib/mysql \
        mysql:8.2

stop:
	docker stop mysql

remove:
	docker rm mysql
