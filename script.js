 const input = document.querySelector('input');
const preview = document.querySelector('.preview');
const fileTypes = [
  "image/jpeg",
  "image/pjpeg",
 ]



function updateImagenameDisplay() {
    while(preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
  
    const imageFiles = input.files;
    
      const div = document.createElement('div');
      div.innerHTML = ` 
      <div class='headers'>
      <h3>S.NO</h3>
      <h3>Image name</h3>
      <h3>is Portrait</h3>
      <h3>is >= 1MB</h3>
      </div>
      `;
      const list = document.createElement('ol');
      preview.appendChild(div);
      preview.appendChild(list);
  
      for(const file of imageFiles) {
         const listItem = document.createElement('li');
         listItem.className = 'list-item';
         const secondDiv = document.createElement('div');
         secondDiv.className = 'list-item-content';
         const fileName = document.createElement('p');
         fileName.textContent = `${file.name}`;
         const potraitOrNot = document.createElement('p');
         const fileSzie = document.createElement('p');
        if(validFileType(file)) {
        
        var reader =  new FileReader();
          reader.onload =  function () {
            var img = new Image;
            img.src = URL.createObjectURL(file);
            img.onload = () => {
              var width = img.width;
              var height = img.height;
            
              
              if(checkImage(width, height) == 'Portrait'){
                potraitOrNot.innerHTML = `
                <div class="check-mark">
                <div class="check-mark-1"></div>
                <div class="check-mark-2"></div>
                </div>
                `
              }else  if(checkImage(width, height) == 'Landscape'){
                potraitOrNot.innerHTML = `
                <div class="cross-mark">
                <div class="cross-mark-1"></div>
                <div class="cross-mark-2"></div>
                </div>
                `
              }

              if(returnFileSize(file.size) == '< 1MB') {
                fileSzie.innerHTML = `
                <div class="cross-mark">
                <div class="cross-mark-1"></div>
                <div class="cross-mark-2"></div>
                </div>
                `
              } else  if(returnFileSize(file.size) == '> 1MB') {
                fileSzie.innerHTML = `
                <div class="check-mark">
                <div class="check-mark-1"></div>
                <div class="check-mark-2"></div>
                </div>
                `
              }
             }
           }
          reader.readAsDataURL(file);
          listItem.appendChild(secondDiv);
          secondDiv.appendChild(fileName);
          console.dir(file);
          secondDiv.appendChild(potraitOrNot);
          secondDiv.appendChild(fileSzie);
         
          

       }else{
            listItem.innerHTML= `
            <div>
            <p>File name ${file.name} is not valid. update your selection.</p>
            </div>
            `
           }

          list.appendChild(listItem);
     }
    }

 
  
  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  function returnFileSize(number) {
    if(number >= 1000000){
      return `> 1MB`;
    }else {
      return `< 1MB`;
     }
   }


      
   function checkImage(width, height){
     let orientation = "";
    if(width > height){
      orientation = `Landscape`;
    }else if(width < height){
      orientation = `Portrait`;
    }else if(width = height){
      orientation = `even`;
    }
    return orientation;
   }

   input.addEventListener('change', updateImagenameDisplay);
  







       
               
       