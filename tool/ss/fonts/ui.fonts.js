var
defaultFont=()=>localStorage.defaultFont,
fontDetails, 
changeUiFonts=(val)=>
{
    document.body.classList.remove(defaultFont());
    document.body.classList.add(val);
},
loadCallFonts=()=>
{
    fetch("ss/fonts/details.json").then(tex=>tex.json()).then(json=>{
        fontDetails=json;
        optList="";
        for(let detail of json){
            console.log(detail)
            optList+=`<option ${(detail.ClassName==localStorage.defaultFont)?"selected":""} style="font-family:${detail.css}" value="${detail.ClassName}">${detail.Title}</option>`
            console.log(
                detail.ClassName==localStorage.defaultFont,
                detail
            )
        }
        $("#fontList").innerHTML=optList;
        $("#fontList").disabled=false;
        $("#fontList").addEventListener("change",ev=>{
            changeUiFonts(ev.target.value)
            localStorage.defaultFont=ev.target.value;
            console.log(ev.currentTarget.value)
        })
    });
    if(!localStorage.defaultFont){
        localStorage.defaultFont="default-fonts";
    }
    document.body.classList.add(localStorage.defaultFont);
};
window.addEventListener("load",lv=>loadCallFonts())
