INSERT INTO department (name)
VALUES
    ('IT'),
    ('Planning'),
    ('Finance'),
    ('Production'),
    ('Materials')
;

INSERT INTO role (title, salary, department_id)
VALUES
    ('SysAdmin', 70000, 1),
    ('Itmanager', 80000,1),
    ('Planner', 40000, 2),
    ('Planning manager', 60000, 2),
    ('CFO', 90000, 3),
    ('Accountant', 65000, 3),
    ('ProdSuper', 60000, 3),
    ('ProdManager', 75000, 3),
    ('Shipper', 35000, 4),
    ('WarehouseManager', 5000, 4)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Charles', 'Xavier', 2, NULL),
    ('Scott', 'Summers', 1, 1),
    ('Jean', 'Gray', 4, NULL),
    ('Henry', 'Mccoy', 3, 3),
    ('Katherine', 'Pryse', 5, NULL),
    ('Rachael', 'Summers', 6, 5),
    ('James', 'Howlett', 7, 8),
    ('Ororo', 'Munroe', 8, 5),
    ('Piot', 'Rasputin', 9, 10),
    ('Raven', 'Darkholm', 10, 5)
;



