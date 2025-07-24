INSERT INTO Role(id, name)
VALUES (1,"player"),(2,"admin");

INSERT INTO Game (name, description, category, available_online, available_maintenance)
VALUES ('Snake', 'Un jeu classique où le serpent grandit en mangeant les pixels sur son chemin !', 'Solo', true, false),
       ('Tic-tac-Toe', 'Un jeu célébre où il faut aligner 3 symboles identique pour gagner la partie !', 'Solo-Multijoueur', true, false),
       ('Breakout', 'Jeu mythique où déplacer votre raquette avec douceur et fermeté vous permettra de renvoyer avec audace la balle sur les briques et marquer des points !!!', 'Solo', false, true),
       ('Dinosaure','Le Dinosaure est un jeu sans fin où il sauter par-dessus des obstacles pour survivre le plus longtemps possible sans ce manger le décors !!!', 'solo', false, false);

INSERT INTO Tarifs (title, subtitle, price)
 VALUES('FREEPLAY', '1 jour', 0.00),
('WEEK-END', '2 jours', 0.00),
 ('FAMILLE', '', 0.00),
('CONCOURS / EVENEMENTS', '', 0.00);