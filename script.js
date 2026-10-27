
const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const obtainedMarks = document.getElementById("obtainedMarks");
const resultsBody = document.getElementById("resultsBody");
const errorMessage = document.getElementById("errorMessage");

const totalStudents = document.getElementById("totalStudents");
const passedStudents = document.getElementById("passedStudents");
const failedStudents = document.getElementById("failedStudents");

// Store all students
let students = [];

// Add Student
studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = studentName.value.trim();
    const marksInput = obtainedMarks.value;

    // Input Validation
    if (name === "") {
        errorMessage.textContent = "Please enter student name.";
        return;
    }

    if (marksInput === "") {
        errorMessage.textContent = "Please enter obtained marks.";
        return;
    }

    const marks = Number(marksInput);

    if (!Number.isInteger(marks) || marks < 0 || marks > 100) {
        errorMessage.textContent = "Marks must be a whole number from 0 to 100.";
        return;
    }

    errorMessage.textContent = "";

    // Calculate Percentage
    const percentage = (marks / 100) * 100;

    // Calculate Grade
    let grade;

    if (marks >= 80) {
        grade = "A";
    } else if (marks >= 70) {
        grade = "B";
    } else if (marks >= 60) {
        grade = "C";
    } else if (marks >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    // Pass or Fail
    let status;

    if (marks >= 50) {
        status = "Pass";
    } else {
        status = "Fail";
    }

    // Create Student Object
    const student = {
        name: name,
        marks: marks,
        percentage: percentage,
        grade: grade,
        status: status
    };

    // Add Student to Array
    students.push(student);

    // Show Results
    displayStudents();

    // Console Output
    console.log("New Student Added:", student);
    console.log("All Students:", students);

    // Clear Form
    studentForm.reset();
});

// Display Students
function displayStudents() {
    resultsBody.innerHTML = "";

    let passed = 0;
    let failed = 0;

    students.forEach(function (student) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td></td>
            <td>${student.marks}/100</td>
            <td>${student.percentage.toFixed(2)}%</td>
            <td>${student.grade}</td>
            <td class="${student.status === "Pass" ? "pass" : "fail"}">
                ${student.status}
            </td>
        `;

        // Safely add student name as text
        row.cells[0].textContent = student.name;

        resultsBody.appendChild(row);

        if (student.status === "Pass") {
            passed++;
        } else {
            failed++;
        }
    });

    // Update Summary Cards
    totalStudents.textContent = students.length;
    passedStudents.textContent = passed;
    failedStudents.textContent = failed;

    // Summary in Console
    console.log("Total Students:", students.length);
    console.log("Passed Students:", passed);
    console.log("Failed Students:", failed);
}
