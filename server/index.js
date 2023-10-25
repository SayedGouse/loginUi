const express= require ('express')
const app = express()
const cors =require ("cors")
const mysql =require ('mysql')

app.use(cors())
app.use(express.json())

const dbcom= mysql.createConnection({
        host:'localhost',
        "user":"root",
        "password":"",
        "database":"orbitemployee"
    })

dbcom.connect(function(err){
    if(err)throw err;
    console.log("connected")
})

app.listen(3001,()=>{
    console.log("running on port 3001")
})

app.post('/submitform',(req,res)=>{
    const {username, email, phone }=req.body.formvalue
    password =req.body.password

    const sql="insert into sign_up(username, email, phone,password)values(?,?,?,?)"

    dbcom.query(sql,[username, email, phone,password],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            dbcom.query("insert into login(email,password)values(?,?)",[email,password])
            res.send(result)
        }
    })


})