let members = JSON.parse(localStorage.getItem("members")) || [];
let treasury = JSON.parse(localStorage.getItem("treasury")) || [];

function saveStorage(){
    localStorage.setItem("members", JSON.stringify(members));
    localStorage.setItem("treasury", JSON.stringify(treasury));
}

// ================= MEMBERS =================

document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("memberForm");

if(form){

form.addEventListener("submit", function(e){

    e.preventDefault();

    const editId = document.getElementById("editId").value;

    const memberData = {
        id: editId ? Number(editId) : Date.now(),
        name: document.getElementById("memberName").value,
        role: document.getElementById("memberRole").value,
        notes: ""
    };

    if(editId){
        const index = members.findIndex(m => m.id == editId);
        memberData.notes = members[index].notes;
        members[index] = memberData;
        alert("Modifié");
    }else{
        members.push(memberData);
        alert("Ajouté");
    }

    saveStorage();
    renderMembers();
    this.reset();
});

renderMembers();

}

// ================= RENDER =================

function renderMembers(){

    const list = document.getElementById("memberList");
    if(!list) return;

    list.innerHTML = "";

    members.forEach(m => {

        list.innerHTML += `
        <div class="col-md-6 mb-3">
            <div class="card p-3 card-member">
                <h6>${m.name}</h6>
                <span class="badge badge-role">${m.role}</span>
            </div>
        </div>`;
    });
}

});