import close from '@assets/main/close.webp';
import { useParams } from "react-router-dom";
import { menus } from '@pages/main/main-types';
import StarRating from '@components/main/starRating';


interface MainModalProps {
    isOpen : boolean;
    onClose : () => void;
}

export const MainModal = ({ isOpen, onClose }: MainModalProps)  => {
  const { storeId } = useParams<{ storeId: string }>();

  console.log("Current store ID:", storeId); 
    
  const menu = menus.find((menu) => menu.id === Number(storeId));
  if (!menu) {
      return <div>데이터를 찾을 수 없습니다.</div>;
  }




    if (!isOpen) return null; 

  return (
    <div style={{ display : 'flex', backgroundColor:'rgba(0, 0, 0, 0.5)', position :'fixed', top:'0', bottom :'0',width :'100%', maxWidth :'400px'}} onClick={onClose}>
      <div style={{backgroundColor : 'white', width :'100%', maxWidth :'400px', position :'fixed', bottom:'54px',
        borderTopLeftRadius :'20px', borderTopRightRadius :'20px', padding :'8px', 
      }}
      onClick={(event) => {
        event.stopPropagation(); // 클릭 이벤트 전파 방지
      }}>
        <div style={{margin :'8px', display : 'flex', width :'344px', height :'48px',alignItems :'center'}}>
          <img src={close} style={{width:'20px', height : '20px', cursor :'pointer'}}  onClick={onClose} />
          <div style={{fontWeight :'bold', justifyContent :'center', display : 'flex', flex : 1}}>
            리뷰작성
          </div>
        </div>

      <div>
      {menu.foods.map((item, index)  => (
        <li key={index} style={{marginBottom : '16px', display :'flex', flexDirection :'column'}}>
          <div style={{textAlign: 'left', fontSize:'14px', fontWeight : 'normal'}}>"{item.name}" (은)는 어떠셨나요?</div>
          <div style={{margin :'0', display:'flex', justifyContent :'center'}}><StarRating /></div>
          </li>
        ))}
      </div>

      <div className='summitButton' style={{ height :'48px', borderRadius :'4px', display : 'flex', justifyContent :'center', alignItems :'center',margin :'0',
        backgroundColor :'#9E9E9E'
      }}>
        <div style={{fontWeight :'bold', color :'white', fontSize :'14px', justifyContent :'center'}}>리뷰 작성</div>
      </div>



      </div>
    </div>
  );
}



