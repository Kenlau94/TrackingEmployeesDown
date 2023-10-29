INSERT INTO department (name)
VALUES  ("Head of Department"), 
        ("Enforcer"), 
        ("Navigation"), 
        ("Entertainment"), 
        ("Vessel"),
        ("Shipwright");

INSERT INTO role (title, salary, department_id)
VALUES  ("Pirate King", 150000.00, 1), 
        ("Marksman", 100000.00, 2), 
        ("Executive Chef", 75000.00, 3), 
        ("Architect", 20000.00, 4), 
        ("Warlord", 100000.00, 6),
        ("Fan", 50000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Tony Tony", "Chopper", 1, NULL), 
        ("Roronoa", "Zoro", 2, NULL),
        ("Cat Burglar", "Nami", 3, NULL), 
        ("Soul", "King", 4, NULL), 
        ("Thousand", "Sunny", 5, NULL),
        ("Cyborg", "Franky", 6, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Monkey D", "Luffy", 1, 1), 
        ("God", "Usopp", 2, 2), 
        ("Vinsmoke", "Sanji", 1, 3), 
        ("Nico", "Robin", 3, 4), 
        ("Knight of the Sea", "Jinbe", 2, 6),
        ("Bartolomeo", "The Cannibal", 4, 5);