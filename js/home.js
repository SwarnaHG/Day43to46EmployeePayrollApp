let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});
const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
//Tempelate literal ES6 feature
const createInnerHtml = () => {
    if (empPayrollList.length == 0) return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
            <tr>
                <td>
                    <img class="profile" src="${empPayrollData._profilePic}" alt="">
                    </td>
                    <td>${empPayrollData._name}</td>
                    <td>${empPayrollData._gender}</td>
                    <td>${getDeptHtml(empPayrollData._department)}</td>
                    <td>${empPayrollData._salary}</td>
                    <td>${stringifyDate(empPayrollData._startDate)}</td>
                    <td>${empPayrollData._startDate}</td>
                    <td>
                        <img name="${empPayrollData._name}" onclick="remove(this)"
                            src="../assets/icons/delete-black-18dp.svg" alt="delete">
                        <img name="${empPayrollData._name}" alt="edit" onclick="update(this)"
                            src="../assets/icons/create-black-18dp.svg">
                </td>
            </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}
const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._name == node.name);
    if(!empPayrollData) return;
    const index = empPayrollList
                    .map(empData => empData._name)
                    .indexOf(empPayrollData._name);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}
