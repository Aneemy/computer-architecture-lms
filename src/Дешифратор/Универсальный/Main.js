import {Table} from "/Универсальный/Классы/Table.js";
import {Encrypt_Dencrypt} from "/Универсальный/Классы/Encrypt-Decrypt.js";
import {Core} from "/Универсальный/Классы/Core.js";
import {OutPut} from "/Универсальный/Классы/OutPut.js";

var table;
var encr;
var Out;
function Setup()
{
    let size=Number(document.getElementById("Size").value);
    if (Number.isInteger(size))
    {
        Core.InitTable(size);
        table.Draw(document.getElementById("Table"));
    }
}

function Draw()
{
    Core.DNFS=table.Minimize();
    encr=new Encrypt_Dencrypt(document.getElementById("Encryptor"),document.getElementById("Decryptor"));
    encr.Draw();
    Out.Draw();
}

function AddEnvents() {
    document.getElementById("Draw").addEventListener("mouseup", (event) => {Draw()});
    document.getElementById("DrawTable").addEventListener("mouseup", (event) => {Setup()});
    document.getElementById("Table").addEventListener("mousemove", (event) => {if (table.isDrawn) {table.ChangePos(event.offsetX,event.offsetY)}});
    document.getElementById("Table").addEventListener("mousedown", (event) => {if (table.isDrawn) {table.Select('Orange')}});
    document.getElementById("Table").addEventListener("mouseup", (event) => {if (table.isDrawn) {table.ChangeValue();table.Select('Yellow')}});
}


//CreateTable();
table=new Table();
Out=new OutPut(document.getElementById("OutPut"));
AddEnvents();