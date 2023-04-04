INSERT INTO department (name)
VALUES
("Security"),
("Engineering"),
("Hospitality");

INSERT INTO role (title, salary, department_id)
VALUE
("Security Manager", 40000.00, 1),
("Engineer", 60000.00, 2),
("Butler", 25000.00, 3),
("CEO", 80000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE
("John", "Doe", 1, 2),
("Jane", "Doe", 2, 4),
("Bob", "Smith", 3, 1),
("Samantha", "Jones", 4, 1);