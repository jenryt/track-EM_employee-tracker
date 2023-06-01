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
VALUES 
  ('John', 'Doe', 1, NULL), -- Software Engineer, no manager
  ('David', 'Brown', 5, NULL), -- HR Manager, no manager
  ('Jane', 'Smith', 2, 2), -- Product Manager, managed by David Brown
  ('Michael', 'Johnson', 3, 2), -- UX Designer, managed by David Brown
  ('Emily', 'Williams', 4, 3), -- Marketing Specialist, managed by Jane Smith
  ('Sarah', 'Jones', 6, 1), -- Data Analyst, managed by John Doe
  ('Christopher', 'Taylor', 7, 4), -- Quality Assurance Engineer, managed by Emily Williams
  ('Olivia', 'Anderson', 8, 4), -- Sales Representative, managed by Emily Williams
  ('Daniel', 'Thomas', 9, 5), -- Operations Manager, managed by David Brown
  ('Sophia', 'Clark', 2, 5), -- Product Manager, managed by David Brown
  ('Matthew', 'Harris', 5, 5), -- HR Manager, managed by himself (David Brown)
  ('Ava', 'Martin', 7, 7); -- Quality Assurance Engineer, managed by herself (Emily Williams)