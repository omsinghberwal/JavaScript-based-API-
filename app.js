
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// Load initial data from JSON file
let data = { employees: [], projects: [], tasks: [] };
const dataFile = 'data.json';

if (fs.existsSync(dataFile)) {
    data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

// Routes for employees
app.get('/api/employees', (req, res) => {
    res.json(data.employees);
});

app.post('/api/employees', (req, res) => {
    const newEmployee = req.body;
    data.employees.push(newEmployee);
    saveData();
    res.status(201).json({ message: 'Employee added', employee: newEmployee });
});

// Routes for projects
app.get('/api/projects', (req, res) => {
    res.json(data.projects);
});

app.post('/api/projects', (req, res) => {
    const newProject = req.body;
    data.projects.push(newProject);
    saveData();
    res.status(201).json({ message: 'Project added', project: newProject });
});

// Routes for tasks
app.get('/api/tasks', (req, res) => {
    res.json(data.tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    data.tasks.push(newTask);
    saveData();
    res.status(201).json({ message: 'Task added', task: newTask });
});

// Function to save data to the JSON file
function saveData() {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    