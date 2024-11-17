import { useParams, useNavigate, useLocation  } from "react-router-dom";
import { useEffect, useState } from 'react';
import goBack from '@assets/main/goBack.webp';
import Recommend from '@assets/main/Recommend.webp';
import NoRecommend from "@assets/main/NoRecommend.webp";
import Review from '@assets/main/review.webp';
import star from "@assets/main/star.webp";
import NoImage from "@assets/main/NoImage.webp";
//import { MainModal } from '@pages/main/mainModal';
import {getMenusWithRatings} from '@apis/mainApi';

export const MainDetailPage = () => {
    const { restaurant = '', date = '' } = useParams<{ restaurant: string; date: string }>();
    const location = useLocation();
    const selectedMenuSet = location.state?.selectedMenuSet;
    const [menuData, setMenuData] = useState<any[]>(selectedMenuSet?.foods || []);  
    const navigate = useNavigate();
    const [isRecommended, setIsRecommended] = useState(false);
    const [isNotRecommended, setIsNotRecommended] = useState(false);
    //const [isModalOpen, setIsModalOpen] = useState(false);
    //const [selectedMenu, setSelectedMenu] = useState<any | null>(null);
    const [averageRating, setAverageRating] = useState<number | null>(null);

    const GoBack = () => {
        navigate(`/`);
    };


    useEffect(() => {
        const fetchMenusAndRatings = async () => {
            try {
                const menus = await getMenusWithRatings(restaurant, date);
                if (Array.isArray(menus)) {
                    // 선택된 메뉴 세트만 필터링
                    const selectedMenuSet = menus.find(menu => menu.restaurant === restaurant && menu.date === date);
                    if (selectedMenuSet) {
                        setMenuData(selectedMenuSet.foods); // 선택된 메뉴 세트의 음식만 설정
                    } else {
                        console.error("No menu set found for the given restaurant and date.");
                    }

                    // 평점 계산
                    const totalRatings = menus.reduce((acc: number, menu: any) => {
                        menu.foods.forEach((food: any) => {
                            acc += food.total_rating;
                        });
                        return acc;
                    }, 0);

                    const totalUsers = menus.reduce((acc: number, menu: any) => {
                        menu.foods.forEach((food: any) => {
                            acc += food.users_count;
                        });
                        return acc;
                    }, 0);

                    const average = totalUsers > 0 ? (totalRatings / totalUsers) : null;
                    setAverageRating(average ? parseFloat(average.toFixed(2)) : null);
                } else {
                    console.error("Expected an array but got:", menus);
                }
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
                            {menuData.length > 0 ? (
                                menuData.map((food: { name: string; average_rating: number }, index: number) => (
                                    <li key={index}>{food.name}</li> // 음식 이름
                                ))
                            ) : (
                                <li>메뉴가 없습니다.</li> // 메뉴가 없을 경우
                            )}
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

            <div className='reviewButton' style={{padding : '8px', cursor :'pointer'}} >
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
