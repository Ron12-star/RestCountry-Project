// const container=document.querySelector('.container')
// const div1=document.querySelector('.one')

document.getElementById('addRow').addEventListener('click', addRow);
// document.getElementById('addColumn').addEventListener('click', addColumn)

function addRow() {
    const table = document.getElementById('gradientTable');
    const newRow = table.insertRow();
    const columns = table.rows[0].cells.length;
    for (let i = 0; i < columns; i++) {
        const newCell = newRow.insertCell();
        newCell.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
    }
    for (let i = 0; i < table.rows.length; i++) {
        const newCell = table.rows[i].insertCell();
        newCell.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
    }
}
