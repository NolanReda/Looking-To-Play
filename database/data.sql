insert into "regionID" ("regionName")
     values ('NA West'),
            ('NA East'),
            ('SA West'),
            ('SA East'),
            ('EU East'),
            ('EU Central'),
            ('EU West'),
            ('CIS'),
            ('Middle East'),
            ('Asia North'),
            ('Asia South'),
            ('Ocieana');

insert into "Users" ("username", "regionId", "timeAvailable", "profilePicture", "recentStats", "hashedPassword")
values ('user1', '1', 'afternoon', null, null, 'blank'),
       ('user2', '1', 'afternoon', null, null, 'blank'),
       ('user3', '1', 'afternoon', null, null, 'blank'),
       ('user4', '1', 'afternoon', null, null, 'blank'),
       ('user5', '1', 'afternoon', null, null, 'blank'),
       ('user6', '7', 'afternoon', null, null, 'blank'),
       ('user7', '7', 'afternoon', null, null, 'blank'),
       ('user8', '7', 'afternoon', null, null, 'blank'),
       ('user9', '7', 'afternoon', null, null, 'blank'),
       ('user10', '7', 'afternoon', null, null, 'blank'),
       ('user11', '7', 'afternoon', null, null, 'blank'),
       ('user12', '3', 'afternoon', null, null, 'blank'),
       ('user13', '3', 'afternoon', null, null, 'blank'),
       ('user14', '3', 'afternoon', null, null, 'blank'),
       ('user15', '3', 'afternoon', null, null, 'blank'),
       ('user16', '3', 'afternoon', null, null, 'blank'),
       ('user17', '5', 'afternoon', null, null, 'blank'),
       ('user18', '5', 'afternoon', null, null, 'blank'),
       ('user19', '5', 'afternoon', null, null, 'blank'),
       ('user20', '5', 'afternoon', null, null, 'blank'),
       ('user21', '5', 'afternoon', null, null, 'blank'),
       ('Sample', '1', 'evening', null, null, '$argon2i$v=19$m=4096,t=3,p=1$DGv3ii2IvrBajrTMIUOKXw$8KzQIHZ51Vc6t7pFOf2vREutGc9t9BN3FBlwc7f6CSQ');

insert into "gameClients" ("name")
     values ('steam'),
            ('faceit');

insert into "clientRanks" ("clientId", "rankName")
     values ('1', 'silver1'),
            ('1', 'silver2'),
            ('1', 'silver3'),
            ('1', 'silver4'),
            ('1', 'silverElite'),
            ('1', 'silverEliteMaster'),
            ('1', 'gold1'),
            ('1', 'gold2'),
            ('1', 'gold3'),
            ('1', 'goldMaster'),
            ('1', 'masterGaurdian1'),
            ('1', 'masterGaurdian2'),
            ('1', 'masterGaurdianElite'),
            ('1', 'distinguishedMasterGaurdian'),
            ('1', 'legendaryEagle'),
            ('1', 'legendaryEagleMaster'),
            ('1', 'supremeMasterFirstClass'),
            ('1', 'GlobalElite'),
            ('2', '1'),
            ('2', '2'),
            ('2', '3'),
            ('2', '4'),
            ('2', '5'),
            ('2', '6'),
            ('2', '7'),
            ('2', '8'),
            ('2', '9'),
            ('2', '10');

insert into "userRanks" ("userId", "clientId", "rankId")
     values ('1', '1', '5'),
            ('1', '2', '21'),

            ('2', '1', '4'),
            ('2', '2', '20'),

            ('3', '1', '5'),

            ('4', '1', '8'),
            ('4', '2', '23'),

            ('5', '1', '4'),
            ('5', '2', '23'),

            ('6', '1', '7'),
            ('6', '2', '22'),

            ('7', '1', '5'),
            ('7', '2', '23'),

            ('8', '1', '5'),
            ('8', '2', '23'),

            ('9', '1', '6'),
            ('9', '2', '21'),

            ('10', '1', '18'),
            ('10', '2', '28'),

            ('11', '1', '13'),
            ('11', '2', '25'),

            ('12', '1', '11'),
            ('12', '2', '23'),

            ('13', '1', '18'),

            ('14', '1', '3'),
            ('14', '2', '20'),

            ('15', '1', '3'),
            ('15', '2', '21'),

            ('16', '1', '2'),
            ('16', '2', '19'),

            ('17', '1', '10'),
            ('17', '2', '25'),

            ('18', '1', '16'),

            ('19', '1', '5'),
            ('19', '2', '22'),

            ('20', '1', '6'),
            ('20', '2',  '23'),

            ('21', '1', '16'),

            ('22', '1', '10'),
            ('22', '2', '22'),

            ('23', '1', '18'),
            ('23', '2', '28');
