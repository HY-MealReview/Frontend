//import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useState} from 'react';
import goBack from '@assets/main/goBack.webp';
import Recommend from '@assets/main/Recommend.webp';
import Review from '@assets/main/review.webp';
import { menus } from '@pages/main/main-types';

export const MainDetailPage = () => {
    const navigate = useNavigate(); 
    const [isRecommended, setIsRecommended] = useState(false);//추천
    const [isNotRecommended, setIsNotRecommended] = useState(false);//비추천
    const { storeId } = useParams<{ storeId: string }>();
    console.log("Current store ID:", storeId); 
    
    const menu = menus.find((menu) => menu.id === Number(storeId));
    if (!menu) {
        return <div>데이터를 찾을 수 없습니다.</div>;
    }
    
    

    const handleRecommendClick = () => {
        if (isRecommended) {
          setIsRecommended(false); // 다시 누르면 해제하기
        } else {
          setIsRecommended(true);  // 추천 버튼 활성화
          setIsNotRecommended(false); // 비추천 버튼 비활성화
        }
    };
    
    const handleNotRecommendClick = () => {
      if (isNotRecommended) {
        setIsNotRecommended(false); // 다시 누르면 해제하기
      } else {
        setIsRecommended(false); // 추천 버튼 비활성화
        setIsNotRecommended(true);// 비추천 버튼활성화
      }
    };
    

    const GoBack =() =>{
        navigate(`/`);
    }

    return(
        <div style={{margin : '0px'}}>
            <div className="topper" style={{display : 'flex', padding : '8px'}}>
                <img src={goBack} style={{width: '24px', marginRight : '16px', cursor : 'pointer'}}                       
                onClick={GoBack}/>
                <div style={{fontSize : '16px', fontWeight:'bold'}}>식당</div>
            </div>

            <div style={{display : 'flex',justifyContent : 'center', padding : '8px'}}>
                <div className='menuContainer' style={{width:'100%', height:'150px', 
                    border : '1px solid #F0F0F0', borderRadius :'8px',
                    display : 'flex'
                }}>
                    <img src={menu.imageUrl} 
                    style={{width : '148px', height : '150px', marginRight : '12px', 
                    borderBottomLeftRadius : '8px', borderTopLeftRadius : '8px',
                    objectFit: 'cover'}} />
                    <div style={{display:'flex', flexDirection :'column', alignItems : 'flex-start',justifyContent : 'center'}}>
                    {menu.foods.map((item, index)  => (
                      <li key={index} style={{textAlign: 'left', fontSize:'12px'}}>{item.name}</li>
                    ))}
                        
                    </div>
                </div>
            </div>

            <div className='reviewCollection' style={{padding : '8px'}}>
                <div style={{fontWeight : 'Bold', fontSize : '14px'}}>
                    통합 리뷰
                </div>

                <div style={{width : '100%', display : 'flex', justifyContent : 'center', marginTop : '8px', marginBottom : '8px'}}>
                    <div className='totalScore' style={{display: 'flex', height : '81px'}}>
                        <div style={{display : 'flex', flexDirection :'column', alignItems : 'center', width : '165px'}}> 
                            <div className='score'>
                                4.4/5
                            </div>
                            <div>
                                메뉴별 종합 별점
                            </div>
                            <div>
                                ⭐️⭐️⭐️⭐️
                            </div>
                        </div>

                        <div style = {{border : '0.5px solid #F0f0f0', height : '81px',
                            marginLeft : '6px', marginRight :'6px'}}/>

                        <div style={{display : 'flex', width :'165px'}}>
                            <div>
                                국밥류
                            </div>
                            <div style={{display : 'flex',justifyContent:'flex-start'}}>
                            ⭐️4.4
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div style={{border : '0.5px solid #f0f0f0', width : '100%'}}/>

            <div className='recommandBox' style={{height: '182px', display : 'flex', gap : '24px', justifyContent : 'center', alignItems : 'center'}}>
                <div className='good' style={{width:'124px', height :'134px', display: 'flex', flexDirection : 'column',justifyContent : 'center', alignItems : 'center'}}>
                    <div style={{color : '#444444', fontSize : '12px', marginBottom : '12px'}}>
                        추천
                    </div>
                    <div style={{border : isRecommended ? '2px solid #134B84' : '1px solid #F0F0F0', 
                    fontWeight : isRecommended ? 'bold' : 'normal',
                    color : isRecommended ? '#134B84' : '#6A6A6A',
                    width:'124px', height :'104px', borderRadius : '12px',
                    cursor : 'pointer',
                        display : 'flex', justifyContent : 'center', alignItems : 'center', gap:'8px', boxShadow : '0 0px 20px rgba(0,0,0,0.1)'
                    }} onClick={handleRecommendClick}>
                        <img src = {Recommend} style={{width:'48px', height : '48px'}}/>
                        <div style={{fontSize:'14px'}}>추천</div>
                    </div>
                </div>
                <div className='bad' style={{width:'124px', height :'134px', display: 'flex', flexDirection : 'column',justifyContent : 'center', alignItems : 'center'}}>
                    <div style={{color : '#444444', fontSize : '12px', marginBottom : '12px'}}>
                        비추천
                    </div>
                    <div style={{border : isNotRecommended ? '2px solid #134B84' : '1px solid #F0F0F0', 
                    color : isNotRecommended ? '#134B84' : '#6A6A6A',
                    fontWeight : isNotRecommended ? 'bold' : 'normal',
                    width:'124px', height :'104px', borderRadius : '12px',
                    cursor : 'pointer',
                        display : 'flex', justifyContent : 'center', alignItems : 'center', gap:'8px', boxShadow : '0 0px 20px rgba(0,0,0,0.1)'
                    }} onClick={handleNotRecommendClick}>
                        <div style={{fontSize:'14px'}}>비추천</div>
                    </div>
                </div>
            </div>

            <div className='reviewButton' style={{padding : '8px'}}>
                <div style={{width : '100%', height : '48px', backgroundColor : '#134B84',
                    borderRadius : '4px', display :'flex', alignItems : 'center', justifyContent :'center', gap : '4px'
                }}>
                    <img src ={Review} style={{width :'20px', height : '20px'}}/>
                    <div style={{color :'white', fontWeight :'bold', fontSize :'12px'}}>
                        리뷰하기
                    </div>
                </div>
            </div>

        </div>
    );

};