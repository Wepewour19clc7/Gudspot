use GudSpot;

create table UserType (
id int not null,
usertype int not null,
primary key(id),
foreign key(id) references auth_user(id)
);

create table Spot (
id char(8) not null,
name varchar(50) not null,
address varchar(100)not null,
likes int not null check(likes >= 0),
follows int not null check (follows >= 0),
description varchar(2000) not null,
primary key(id)
);

create table Blog (
id char(10) not null,
userid int not null,
content varchar(5000) not null,
pic_path varchar(50) not null,
blogdate datetime not null,
hidden bool not null default 0,
primary key (id),
foreign key (userid) references auth_user(id)
);

create table Blog_Spot (
spot_id char(8) not null,
blog_id char(10) not null,
primary key(spot_id,
blog_id),
foreign key(spot_id) references Spot(id),
foreign key(blog_id) references Blog(id)
);

create table Ownership (
user_id int not null,
spot_id char(8) not null,
primary key(user_id,
spot_id),
foreign key(user_id) references auth_user(id),
foreign key(spot_id) references Spot(id)
);

create table Comment (
id int not null,
user_id int not null,
blog_id char(10) not null,
commentdate date not null,
content varchar(1000) not null,
primary key(id,
user_id,
blog_id),
foreign key(user_id) references auth_user(id),
foreign key(blog_id) references Blog(id)
);

-- drop table UserType;
-- 
-- drop table Spot;
-- 
-- drop table Blog;
-- 
-- drop table Comment;
-- 
-- drop table Ownership;
-- 
-- drop table Blog_Spot;
