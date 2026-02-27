let matriz = [
    ["Ana", "Paulo", "Marcia"],
    ["Ricardo", "Daniel", "Mariza"],
    ["Thomas", "Cristina", "Eduarda"],
    ["Lauro", "Eliza", "Beth"]
]

for(let l = 0; l < 4; l++){
    for(c = 0; c < 3; c++){
        console.log("m["+l +"]["+c+"] = " + matriz[l][c])
    }
}