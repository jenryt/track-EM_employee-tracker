INSERT INTO department (name)
VALUES ('Engineering'),
       ('Product Management'),
       ('Design'),
       ('Marketing'),
       ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 80000.00, 1),
       ('Product Manager', 100000.00, 2),
       ('UX Designer', 75000.50, 3),
       ('Marketing Specialist', 60000.50, 4),
       ('HR Manager', 90000.50, 5),
       ('Data Analyst', 70000.00, 1),
       ('Quality Assurance Engineer', 65000.50, 1),
       ('Sales Representative', 70000.00, 4),
       ('Operations Manager', 95000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), -- Software Engineer, no manager
       ('Jane', 'Smith', 2, 5), -- Product Manager, managed by HR Manager
       ('Michael', 'Johnson', 3, 5), -- UX Designer, managed by HR Manager
       ('Emily', 'Williams', 4, 2), -- Marketing Specialist, managed by Product Manager
       ('David', 'Brown', 5, NULL), -- HR Manager, no manager
       ('Sarah', 'Jones', 6, 1), -- Data Analyst, managed by Software Engineer
       ('Christopher', 'Taylor', 7, 4), -- Quality Assurance Engineer, managed by Marketing Specialist
       ('Olivia', 'Anderson', 8, 4), -- Sales Representative, managed by Marketing Specialist
       ('Daniel', 'Thomas', 9, 5), -- Operations Manager, managed by HR Manager
       ('Sophia', 'Clark', 2, 5), -- Product Manager, managed by HR Manager
       ('Matthew', 'Harris', 5, NULL), -- HR Manager, no manager
       ('Ava', 'Martin', 7, 4); -- Quality Assurance Engineer, managed by Marketing Specialist