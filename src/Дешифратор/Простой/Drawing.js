import {Table} from "/Простой/Классы/Table.js";
import {Encrypt_Dencrypt} from "/Простой/Классы/Encrypt-Decrypt.js";
import {Core} from "/Простой/Классы/Core.js";

var table;
var encrypt;
function CreateTable() {
    Core.InitTable(9);
    for (let i=1;i<10;++i)
    {
        let k=i;
        for (let j=Core.TableOfTruth[0].length-1;k!=0;--j)
        {
            if (k%2==1)
            {
                Core.Change(i-1,j);
            }
            k=Math.floor(k/2);
        }
    }
}

function AddEnvents() {
    for (let i=1;i<10;++i)
    {
        document.getElementById("Key"+i).addEventListener("mouseover", (event) => {table.SelectRow(i,'#f0bf0e','#ed4d0e')});
        document.getElementById("Key"+i).addEventListener("mouseout", (event) => {table.SelectRow(i,'#ffffff','#ffffff')});
        document.getElementById("Key"+i).addEventListener("click", (event) => {encrypt.StartAnimationEncrypt('#77eb34',i-1)});
    }
}
CreateTable();
table=new Table(document.getElementById("Table"));
table.Draw();
encrypt=new Encrypt_Dencrypt(document.getElementById("Encryptor"),document.getElementById("Decryptor"));
encrypt.Draw();
AddEnvents();
//DrawEncryptor();