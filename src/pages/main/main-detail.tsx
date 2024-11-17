import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getMenusByRestaurantAndDate } from '@apis/mainApi';
import goBack from '@assets/main/goBack.webp';
import Recommend from '@assets/main/Recommend.webp';
import NoRecommend from "@assets/main/NoRecommend.webp";
import Review from '@assets/main/review.webp';
import star from "@assets/main/star.webp";
import NoImage from "@assets/main/NoImage.webp";
import { MainModal } from '@pages/main/mainModal';
import { getRatingsByRestaurantAndDate } from '@apis/mainApi';

export const MainDetailPage = () => {
    const { restaurant='', date='' } = useParams<{ restaurant: string; date: string }>();
    const [menuData, setMenuData] = useState<any[]>([]);
    const navigate = useNavigate(); //페이지 이동하기
    const [isRecommended, setIsRecommended] = useState(false);//추천
    const [isNotRecommended, setIsNotRecommended] = useState(false);//비추천
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ setSelectedMenu] = useState<any | null>(null);
    const [averageRating, setAverageRating] = useState<number | null>(null); // 종합 평점 상태

    const openModal = (menu: any) => {
        setSelectedMenu(menu); // 선택된 메뉴 설정
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
        setSelectedMenu(null); // 선택된 메뉴 초기화
    };



    const GoBack =() =>{
        navigate(`/`);
    }

    useEffect(() => {
        const fetchMenusAndRatings = async () => {
            try {
                // 메뉴 가져오기
                const menus = await getMenusByRestaurantAndDate(restaurant, date);
                const filteredMenus = menus.filter(menu => menu.restaurant === restaurant && menu.date === date);
                setMenuData(filteredMenus);

                // 평점 가져오기
                const ratingsData = await getRatingsByRestaurantAndDate(restaurant, date);
                const totalRatings = ratingsData.reduce((acc: number, item: any) => {
                    item.foods.forEach((food: any) => {
                        acc += food.total_rating; // 총 평점 합산
                    });
                    return acc;
                }, 0);

                const totalUsers = ratingsData.reduce((acc: number, item: any) => {
                    item.foods.forEach((food: any) => {
                        acc += food.users_count; // 사용자 수 합산
                    });
                    return acc;
                }, 0);

         // 종합 평점 계산
         const average = totalUsers > 0 ? (totalRatings / totalUsers) : null; // 0으로 나누기 방지
         setAverageRating(average ? parseFloat(average.toFixed(2)) : null); // 상태에 저장

     } catch (error) {
         console.error("Error fetching menu and ratings data:", error);
     }
 };

 fetchMenusAndRatings();
}, [restaurant, date]);



  

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


 return (

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
                    <img src={NoImage} 
                    style={{width : '148px', height : '150px', marginRight : '12px', 
                    borderBottomLeftRadius : '8px', borderTopLeftRadius : '8px',
                    objectFit: 'cover'}} />
                    <div style={{display:'flex', flexDirection :'column', alignItems : 'flex-start',justifyContent : 'center'}}>
                    <ul>
                        {menuData.map(menu => (
                        <li key={menu.id}>
                            <ul>
                            {menu.foods.map((food : string, index : number) => (
                                <li key={index}>
                                    {food}
                               </li>
                            ))}
                            </ul>
                        </li>
                        ))}
                    </ul>
                        
                    </div>
                </div>
            </div>

            {/* 별점 섹션 */}
            <div className='reviewCollection' style={{padding : '8px'}}>
                <div style={{fontWeight : 'Bold', fontSize : '14px'}}>
                    통합 리뷰
                </div>

                <div style={{width : '100%', display : 'flex', justifyContent : 'center', marginTop : '8px', marginBottom : '8px'}}>
                    <div className='totalScore' style={{display: 'flex', height : '81px'}}>
                        <div style={{display : 'flex', flexDirection :'column', alignItems : 'center', width : '165px'}}> 
                            <div className='score' style={{fontSize : '24px', color : "#6A6A6A"}}>
                            <span style={{color : '#1D1D1D', fontWeight : 'bold '}}>{averageRating !== null ? averageRating : 'N/A'}</span>/5
                            </div>
                            <div style={{fontSize : '12px', color : "#6A6A6A"}}>
                                메뉴별 종합 별점
                            </div>
                            <div>
                            
                                
                            </div>
                        </div>

                        <div style = {{border : '0.5px solid #F0f0f0', height : '81px',
                            marginLeft : '6px', marginRight :'6px'}}/>

                        <div style={{display : 'flex', width :'165px'}}>
                            <div style={{textAlign:'right', alignItems:'center', display : 'flex', justifyItems : 'center'}}>
                                국밥류
                                <div style={{display : 'flex',justifyContent:'flex-start' , alignItems :'center'}}>
                                <img src={star} style={{width:'20px', height:'20px', margin : '5px'}} />
                                4.4
                            </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div style={{border : '0.5px solid #f0f0f0', width : '100%'}}/>


            {/* 추천/비추천 섹션 */}
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
                        <img src = {NoRecommend} style={{width:'48px', height : '48px'}}/>
                        <div style={{fontSize:'14px'}}>비추천</div>
                    </div>
                </div>
            </div>

            <div className='reviewButton' style={{padding : '8px', cursor :'pointer'}} onClick={openModal}>
                <div style={{width : '100%', height : '48px', backgroundColor : '#134B84',
                    borderRadius : '4px', display :'flex', alignItems : 'center', justifyContent :'center', gap : '4px'
                }}>
                    <img src ={Review} style={{width :'20px', height : '20px'}}/>
                    <div style={{color :'white', fontWeight :'bold', fontSize :'12px'}}>
                        리뷰하기
                    </div>
                </div>
               
            </div>
            <MainModal isOpen={isModalOpen} onClose={closeModal}  />
    </div>

  );
};
