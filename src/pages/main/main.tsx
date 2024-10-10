//import { useState } from 'react';
import LogoImage from "@assets/main/logo.webp";
import { stores } from "./main-types";


export const MainPage = () => {

  return (
    <div>
      <div style={{display:'flex', top:'0',  justifyContent:'center', marginBottom:'12px', marginTop:'12px', position: 'sticky'}}>
        <img src={LogoImage} style={{ width: '85px', height: 'auto' }}/>
      </div>

      <div className='menuSliderContainer' style={{overflow:'hidden', width:'1000px' }}>
        <div className="menuSlider" style={{}}>
        {stores.map((store, index) => (
          
            <div className="menu1" key={store.id} onClick={() => handleMenuChange(index)} style={{ float: 'left', width: '328px', height: '482px', marginRight:'8px', marginBottom:'10px', boxShadow: '10px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '12px'  }}>
              <img src={store.imageUrl} style={{ width: '328px', height: 'auto' }} alt={store.name} />
              <div className="menuName" style={{ margin:'14px', }}>
                {store.mainMenu.map((menuItem, index) => (
                  <div key={index} >{menuItem.name}</div>
                ))}
              </div>

              </div>


          ))}
        </div>
      </div>

    </div>
  );
};
