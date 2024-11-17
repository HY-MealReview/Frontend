import { useParams, useNavigate, useLocation  } from "react-router-dom";
import { useEffect, useState } from 'react';
import goBack from '@assets/main/goBack.webp';
import Recommend from '@assets/main/Recommend.webp';
import NoRecommend from "@assets/main/NoRecommend.webp";
import Review from '@assets/main/review.webp';
import star from "@assets/main/star.webp";
import NoImage from "@assets/main/NoImage.webp";
import { MainModal } from '@pages/main/mainModal';
import {getMenusWithRatings} from '@apis/mainApi';
import axios from "axios";


export const MainDetailPage = () => {
    const { restaurant = '', date = '' } = useParams<{ restaurant: string; date: string }>();
    const location = useLocation();
    const selectedMenuSet = location.state?.selectedMenuSet;
    const [menuData, setMenuData] = useState<any[]>(selectedMenuSet?.foods || []);  
    const navigate = useNavigate();
    const [isRecommended, setIsRecommended] = useState(false);
    const [isNotRecommended, setIsNotRecommended] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ratings, setRatings] = useState<number[]>(Array(menuData.length).fill(0)); // 각 음식별 별점
    const [averageRating, setAverageRating] = useState<number | null>(null);

    const GoBack = () => {
        navigate(`/`);
    };

    useEffect(() => {
        if (selectedMenuSet) {
            setMenuData(selectedMenuSet.foods);
            calculateAverageRating(selectedMenuSet.foods);
            return;
        }

        const fetchMenusAndRatings = async () => {
            try {
                const menus = await getMenusWithRatings(restaurant, date);
                if (Array.isArray(menus)) {
                    const selectedMenuSet = menus.find(menu => menu.restaurant_name === restaurant && menu.menu_date === date);
                    if (selectedMenuSet) {
                        // 메뉴 데이터와 별점 데이터 매핑
                        const foodsWithRatings = selectedMenuSet.foods.map(food => ({
                            ...food,
                            average_rating: food.average_rating || 0, // 평점이 없으면 0으로 설정
                        }));
                        setMenuData(foodsWithRatings);
                        calculateAverageRating(foodsWithRatings);
                    }
                }
            } catch (error) {
                console.error("Error fetching menu and ratings data:", error);
            }
        };

        fetchMenusAndRatings();
    }, [restaurant, date, averageRating]);


   
    const calculateAverageRating = (foods: any[]) => {
        const totalRatings = foods.reduce((acc, food) => acc + (food.average_rating || 0), 0);
        const totalFoods = foods.length;
        const average = totalFoods > 0 ? totalRatings / totalFoods : null;
        setAverageRating(average ? parseFloat(average.toFixed(2)) : null);
    };



  

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

const openModal = () => {
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
};
const handleRatingChange = (index: number, rating: number) => {
    const newRatings = [...ratings];
    newRatings[index] = rating; // 해당 음식의 별점 업데이트
    setRatings(newRatings); // 상태 업데이트
};

const isReviewButtonEnabled = ratings.every(rating => rating > 0);

const submitReview = async () => {
    try {
        for (let i = 0; i < menuData.length; i++) {
            const response = await axios.post('/rating/', {
                food: menuData[i].id,
                rating: ratings[i],
            });
            console.log("리뷰가 성공적으로 제출되었습니다:", response.data);
        }
        alert("모든 리뷰가 성공적으로 제출되었습니다.");
    } catch (error) {
        console.error("리뷰 제출 중 오류 발생:", error);
        alert("리뷰 제출에 실패했습니다.");
    }
};

 return (

    <div style={{margin : '0px'}}>
            <div className="topper" style={{display : 'flex', padding : '8px'}}>
                <img src={goBack} style={{width: '24px', marginRight : '16px', cursor : 'pointer'}}                       
                onClick={GoBack}/>
                <div style={{fontSize : '16px', fontWeight:'bold'}}>{restaurant}</div>
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
                                    <li key={index} style={{width : '184px',marginBottom : '4px',textAlign: 'left', fontSize:'12px', fontWeight : 'normal', display :'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        {/* 음식 이름 */}
                                        • {food.name}
                                        <div style={{width :'50px', display :'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <img src={star} style={{ width: '20px', height: '20px', margin: '5px' }} />
                                        {food.average_rating ? food.average_rating.toFixed(1) : '0'}
                                        </div>
                                    </li>
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
                                <span style={{color : '#1D1D1D', fontWeight : 'bold '}}>{averageRating !== null ? averageRating : '0'}</span>/5
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
                            <div style={{width : '184px',marginBottom : '4px',textAlign: 'left', fontSize:'12px', fontWeight : 'normal', display :'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                국밥류({restaurant})
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
        <div style={{color :'white', fontWeight :'bold', fontSize :'12px'}}  onClick={isReviewButtonEnabled ? submitReview : undefined}>
            리뷰하기
        </div>
    </div>
</div>
<MainModal isOpen={isModalOpen} onClose={closeModal} menuData={menuData}  onRatingChange={handleRatingChange}   />
    </div>

  );
};
