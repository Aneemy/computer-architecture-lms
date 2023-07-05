export function FillPoly(context, color, arr) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(arr[0], arr[1]);
    for (let i = 2; i < arr.length; i += 2)
        context.lineTo(arr[i], arr[i + 1]);
    context.closePath();
    context.fill();
}

export function FillRect(context, color, x1,x2,y1,y2) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x1, y1); 
    context.lineTo(x2, y1);
    context.lineTo(x2, y2);
    context.lineTo(x1, y2);        
    context.closePath();
    context.fill();
}

export function DrawSimpleLine(context, x1, x2, y1, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

export function DrawRect(context, x, y, width, height) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + width, y);
    context.lineTo(x + width, y + height);
    context.lineTo(x, y + height);
    context.lineTo(x, y);
    context.stroke();
}

export function DrawSelect(context,xl,yl,xr,yr,yc,p)
{
    let part1=(xr-xl)/2;
    let part2=yr-yl;
    let part3=Math.sqrt(Math.pow(part1,2)+Math.pow(yc-yr,2));
    let way=part1+part2+part3;
    let part1p= part1/way;
    let part2p= part2/way;
    let part3p= part3/way;
    context.beginPath();
    context.moveTo(xl+part1, yl);
    let per=(p<part1p)?(p/part1p):(1);
    context.lineTo(xl+part1*(1+per),yl);
    context.lineTo(xl+part1*(1-per),yl);
    p-=part1p;
    if (p>0)
    {
        per=(p<part2p)?(p/part2p):(1);
        context.moveTo(xr, yl);
        context.lineTo(xr,yl+part2*per);
        context.moveTo(xl, yl);
        context.lineTo(xl,yl+part2*per);
        p-=part2p;
        if (p>0)
        {   
            per=(p<part3p)?(p/part3p):(1);
            let ymove=yc-yr;
            context.moveTo(xl, yr);
            context.lineTo(xl+part1*per,yr+ymove*per);
            context.moveTo(xr, yr);
            context.lineTo(xr-part1*per,yr+ymove*per);
        }
    }
    context.stroke();
}

export function DrawReverseSelect(context,xl,yl,xr,yr,yc,p)
{
    let part1=(xr-xl)/2;
    let part2=yr-yl;
    let part3=Math.sqrt(Math.pow(part1,2)+Math.pow(yc-yr,2));
    let way=part1+part2+part3;
    let part1p= part1/way;
    let part2p= part2/way;
    let part3p= part3/way;
    let per=(p<part3p)?(p/part3p):(1);
    let ymove=yc-yr;
    context.beginPath();
    context.moveTo(xl+part1, yc);
    context.lineTo(xl+part1*(1+per),yc-ymove*per);
    context.moveTo(xl+part1, yc);
    context.lineTo(xl+part1*(1-per),yc-ymove*per);
    p-=part3p;
    if (p>0)
    {
        per=(p<part2p)?(p/part2p):(1);
        context.moveTo(xr, yr);
        context.lineTo(xr,yr-part2*per);
        context.moveTo(xl, yr);
        context.lineTo(xl,yr-part2*per);
        p-=part2p;
        if (p>0)
        {   
            per=(p<part1p)?(p/part1p):(1);
            context.moveTo(xl, yl);
            context.lineTo(xl+part1*per,yl);
            context.moveTo(xr, yl);
            context.lineTo(xr-part1*per,yl);
        }
    }
    context.stroke();
}

function GetRGB(color)
{
    if (color[0]=='#')
    {
        let rgb=new Array(3);
        let bigint = parseInt(color.split('#')[1], 16);
        rgb[0] = (bigint >> 16) & 255;
        rgb[1] = (bigint >> 8) & 255;
        rgb[2] = bigint & 255;
        return rgb;
    }
    else
    {
        let list= color.substr(4,color.length-5);
        return list.split(',');
    }
}

export function CopySet(set) {
    let newset = new Set();
    for (let s of set.keys())
        newset.add(s);
    return newset;
}

export function CopyMap(map) {
    let newmap = new Map();
    for (let key of map.keys())
        newmap.set(key,map.get(key));
    return newmap;
}

export function MultMaps(map1,map2)
{
    for (let key of map2.keys())
        if (!map1.has(key))
            map1.set(key,map2.get(key));
}

export function DrawText(context,x,y,text,font)
{
    context.font=font;
    context.fillText(text, x, y);
    return x+context.measureText(text).width;
}