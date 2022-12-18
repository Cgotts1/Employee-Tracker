SELECT department.first_name AS department, role.title
FROM role
LEFT JOIN department
ON role.department_id = department.id
ORDER BY department.role_title;