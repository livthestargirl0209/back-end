create database jin;
use jin;

create table usuario (
id_usuario INT PRIMARY KEY,
nome varchar(20) NOT NULL,
senha varchar(8) NOT NULL
);

insert into usuario (id_usuario, nome, senha) values
(1, 'olivia', '1234');