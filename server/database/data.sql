INSERT INTO Role(id, name)
VALUES (1,"player"),(2,"admin");

INSERT INTO Game (name, description, category, available_online, available_maintenance, images)
VALUES ('Snake', 'Un jeu classique où le serpent grandit en mangeant les pixels sur son chemin !', 'Solo', true, false, 1753709683811-snake.png),
       ('Tic-tac-Toe', 'Un jeu célébre où il faut aligner 3 symboles identique pour gagner la partie !', 'Solo-Multijoueur', true, false, 1753709698376-tic-tac-toe.png),
       ('Breakout', 'Jeu mythique où déplacer votre raquette avec douceur et fermeté vous permettra de renvoyer avec audace la balle sur les briques et marquer des points !!!', 'Solo', false, true, 1753709676993-breakout.png),
       ('Dinosaure','Le Dinosaure est un jeu sans fin où il sauter par-dessus des obstacles pour survivre le plus longtemps possible sans ce manger le décors !!!', 'solo', false, false, 1753710454747-dinosaure.png);

INSERT INTO Tarifs (title, subtitle, price)
 VALUES('FREEPLAY', '1 jour', 0.00),
('WEEK-END', '2 jours', 0.00),
 ('FAMILLE', '', 0.00),
('CONCOURS / EVENEMENTS', '', 0.00);