create table empresa(
cnpj char(14) primary key,
nomeempresa varchar(45),
telefonePrincipal varchar(15),
telefoneSecundario varchar(15),
plano varchar (45)
);
drop database luminous;
drop table usuario;
drop table filial;
drop table empresa;
drop table endereco;
select * from empresa;
select * from usuario;
select * from filial;
select * from endereco;
select * from filial inner join empresa on cnpj = fkEmpresa inner join endereco on cep = fkEndereco;

create table usuario(
idusuario int primary key auto_increment,
nome varchar(30),
sobrenome varchar(30),
email varchar(45),
senha varchar(45),
fk_empresa char (15),
foreign key (fk_empresa) references empresa(cnpj)
);

create table endereco(
cep char(8) primary key,
logradouro varchar(45),
bairro varchar(45),
cidade varchar(45),
estado varchar(45)
);

create table filial(
idFilial int auto_increment,
fkEndereco char(8),
fkEmpresa char(15),
foreign key (fkEndereco) references endereco(cep),
foreign key (fkEmpresa) references empresa(cnpj),
primary key(idFilial,fkEndereco,fkEmpresa),
numero int,
complemento varchar(45)
);

create table sensor(
idsensor int primary key,
sala varchar(10),
posicao varchar(20),
fkfilial_empresa_cep char(8),
fkfilial_empresa_cnpj char(15),
foreign key (fkfilial_empresa_cep) references filial(fkcep),
foreign key (fkfilial_empresa_cnpj) references filial(fkcnpj),
parametro varchar(45)
);

create table dados(
iddados int primary key,
lumens int,
data_registro datetime,
fksensor int,
foreign key (fksensor) references sensor(idsensor)
);

