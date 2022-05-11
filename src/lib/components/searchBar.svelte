<style>
.form-search{
  position: relative;
  top:30px;
  /* left: 50%; */
  transform: translate(-50%,-50%);
  transition: all 0.1s;
  width: 50px;
  height: 50px;
  background: white;
  box-sizing: border-box;
  border-radius: 25px;
  border: 4px solid white;
  
}
 
.input-search{
  top: 0;
  left: 0;
  width: 100%;;
  height: 35px;
  line-height: 30px;
  outline: 0;
  border: 0;
  display: none;
  font-size: 1em;
  border-radius: 20px;
  padding: 0 20px;
}

.fa{
  box-sizing: border-box;
  padding: 10px;
  width: 42.5px;
  height: 42.5px;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  color: #07051a;
  text-align: center;
  font-size: 1.2em;
  transition: all 0.1s;
}

.form-search:hover,
.form-search:valid{
  width: 200px;
  cursor: pointer;
}

.form-search:hover input,
.form-search:valid input{
  display: block;
}

.form-search:hover .fa,
.form-search:valid .fa{
  background: #07051a;
  color: white;
}


.a {
display: none;
position: absolute;
top: 70px;
bottom:0;
left: 0;
right: 0;
font-size: 20px;
color: white;
text-align: center; 
width: 100%;
}

.form-search:valid a {
display: block;
}
</style>

<form class= "form-search"action="">
    <input class=" input-search" type="search" data-input required>
    <i class="fa fa-search"></i>
    <a id="clear-btn"></a>
</form>