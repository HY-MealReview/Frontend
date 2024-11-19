import { useParams, useNavigate, useLocation  } from "react-router-dom";
import { useEffect, useState } from 'react';
import goBack from '@assets/main/goBack.webp';
import Recommend from '@assets/main/Recommend.webp';
import RecommendClick from '@assets/main/RecommendedClicked.webp';
import NoRecommend from "@assets/main/NoRecommend.webp";
import NoRecommendClicked from "@assets/main/NoRecommendClicked.webp"
import Review from '@assets/main/review.webp';
import star from "@assets/main/star.webp";
import NoImage from "@assets/main/NoImage.webp";
import { MainModal } from '@pages/main/mainModal';
import {getMenusWithRatings, getFoodCategory, getRecommendCount, createRecommend, recommendCancelMenu, getCategoryAverageRating} from '@apis/mainApi';
import { axiosInstance } from "@apis/axiosInstance";
import axios from "axios";
interface Food {
    name: string;
    average_rating: number;
}


export const MainDetailPage = () => {
    const { restaurant = '', date = '' } = useParams<{ restaurant: string; date: string }>();
    const location = useLocation();
    const selectedMenuSet = location.state?.selectedMenuSet;
    const [menuData, setMenuData] = useState<any[]>(selectedMenuSet?.foods || []);  
    const menuSetId = selectedMenuSet?.id;
    const navigate = useNavigate();
    const [isRecommended, setIsRecommended] = useState<boolean | null>(null); // 추천 상태
    const [recommendCount, setRecommendCount] = useState<{ true_count: number; false_count: number } | null>(null); // 추천/비추천 수
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ratings, setRatings] = useState<number[]>(Array(menuData.length).fill(0)); // 각 음식별 별점
    const [categoryName, setCategoryName] = useState<string>(""); // 카테고리 이름 상태
    const [averageRating, setAverageRating] = useState<number>(0); // 카테고리 평균 평점 상태
    const openModal = () => setIsModalOpen(true);

    const GoBack = () => {
        navigate(`/`);
    };

    useEffect(() => {
        if (selectedMenuSet) {
          fetchRecommendCount(selectedMenuSet.id); // 메뉴 세트의 ID로 추천 수 가져오기
        }
      }, [selectedMenuSet]);

    

      // 메뉴 세트 추천 수를 불러오는 함수
  const fetchRecommendCount = async (menuSetId: number) => {
    
    try {
      const count = await getRecommendCount(menuSetId); // 메뉴 세트 ID로 추천 수 가져오기
      setRecommendCount(count); // 추천 수 상태 업데이트
    } catch (error) {
      console.error("Error fetching recommend count:", error);
    }
  };

    // 추천/비추천 클릭 핸들러
    const handleRecommendClick = async (recommendation: boolean) => {
        if (isRecommended === recommendation) {
          // 이미 선택된 경우 취소
          try {
            await recommendCancelMenu(menuSetId, recommendation);
            setIsRecommended(null);
            setRecommendCount((prev) => 
              prev ? {
                true_count: recommendation ? prev.true_count - 1 : prev.true_count,
                false_count: recommendation ? prev.false_count : prev.false_count - 1,
              } : null
            );
          } catch (error) {
            console.error("Error cancelling recommendation:", error);
          }
        } else {
          // 선택되지 않은 경우 API 호출
          try {
            await createRecommend(menuSetId, recommendation);
            setIsRecommended(recommendation);
            setRecommendCount((prev) => 
              prev ? {
                true_count: recommendation ? prev.true_count + 1 : prev.true_count,
                false_count: recommendation ? prev.false_count : prev.false_count + 1,
              } : null
            );
          } catch (error) {
            console.error("Error creating recommendation:", error);
          }
        }
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
                    }
                }
            } catch (error) {
                console.error("Error fetching menu and ratings data:", error);
            }
        };

        fetchMenusAndRatings();
    }, [restaurant, date, averageRating]);


    //메뉴 배열에서 첫번째 메뉴의 카테고리 가져오기
    useEffect(() => {
        if (menuData.length > 0) {
          // 첫 번째 음식의 카테고리명을 가져옴
          const fetchCategoryName = async () => {
            try {
              const firstFoodName = menuData[0].name; // 첫 번째 음식 이름
              const category = await getFoodCategory(firstFoodName, restaurant); // 카테고리명 가져오기
              setCategoryName(category || ""); // 가져온 카테고리명 설정
              if (category) {
                // 카테고리 평균 평점 계산
                const { averageRating } = await getCategoryAverageRating(firstFoodName, restaurant);
                setAverageRating(averageRating ?? null); // 평균값이 없으면 null 설정
              }
            } catch (error) {
              console.error("Error fetching category data:", error);
            }
          };
    
          fetchCategoryName();
        }
      }, [menuData, restaurant]); 


//----------------메뉴별 종합 평점----------------
      const calculateAverageRating = (foods: Food[]) => {
        if (!foods || foods.length === 0) {
            setAverageRating(100); // 메뉴가 없을 경우 평균 평점 100으로 설정(알아보는용)
            return;
        }
        const totalRatings = foods.reduce((acc, food) => acc + (food.average_rating || 0), 0);
        const average = totalRatings / foods.length;
        setAverageRating(parseFloat(average.toFixed(1))); // 소수점 1자리까지 저장
    };
    useEffect(() => {
        console.log("menuData:", menuData);
        console.log("averageRating:", averageRating);
    }, [menuData, averageRating]);

    useEffect(() => {
        if (selectedMenuSet) {
            setMenuData(selectedMenuSet.foods);
            calculateAverageRating(selectedMenuSet.foods);
            return;
        }
    }, [selectedMenuSet]);
    


//const isReviewButtonEnabled = ratings.every(rating => rating > 0);
const submitReview = async () => {
    try {
        const response = await axiosInstance.post(`/rating/`, {
            food: menuData[0].id, // 첫 번째 음식 id
            rating: ratings[0] // 첫 번째 음식 별점
      });
  
      // 서버 응답 처리 (예: 성공 메시지)
      if (response && response.data) {
        console.log('리뷰 제출 성공:', response.data);
        // 서버 응답에 따라 추가 작업 수행 (예: 모달 닫기)
      } else {
        console.error('서버에서 응답을 받지 못했습니다.');
      }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // AxiosError로 타입 확인
          console.error("서버 오류:", error.response?.status, error.response?.data);
        } else {
          console.error("네트워크 오류 또는 응답 없음");
        }
        console.error("리뷰 제출 중 오류 발생:", error);
        return null;
      }
  };
  console.log("Menu Data:", menuData); // 메뉴 데이터의 확인용 로그 추가


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
                    <img
      src={selectedMenuSet?.image || NoImage} // selectedMenuSet의 image가 있으면 그걸 사용하고 없으면 NoImage 사용
      style={{
        width: '148px',
        height: '150px',
        marginRight: '12px',
        borderBottomLeftRadius: '8px',
        borderTopLeftRadius: '8px',
        objectFit: 'cover',
      }}
      alt="Menu Image"
    />
                    <div style={{display:'flex', flexDirection :'column', alignItems : 'flex-start',justifyContent : 'center'}}>
                    <ul>
                            {menuData.length > 0 ? (
                                menuData.map((food: { name: string; average_rating: number }, index: number) => (
                                    <li key={index} style={{width : '184px',marginBottom : '4px',textAlign: 'left', fontSize:'12px', fontWeight : 'normal', display :'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        {/* 음식 이름 */}
                                        • {food.name}
                                        <div style={{width :'50px', display :'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <img src={star} style={{ width: '20px', height: '20px', margin: '5px' }} />
                                        {food.average_rating.toFixed(1)}
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
                                <span style={{color : '#1D1D1D', fontWeight : 'bold '}}>{averageRating}</span>/5
                            </div>
                            <div style={{fontSize : '12px', color : "#6A6A6A"}}>
                                메뉴별 종합 별점
                            </div>
                            {/* 종합별점에 따라 별채우기 */}
                <div style={{ display: 'flex', marginTop: '5px' }}>
                    {[...Array(5)].map((_, index) => {
                        const ratingForStar = averageRating ? averageRating - index : 0;
                        return (
                            <img
                                key={index}
                                src={ratingForStar >= 1 ? star : ratingForStar >= 0.5 ? NoImage : star} // `star`는 노란색 별, `NoImage`는 회색 별을 사용
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    margin: '0 3px',
                                    filter: ratingForStar >= 1 ? 'none' : 'grayscale(100%)',
                                }}
                                alt="Star"
                            />
                        );
                    })}
                </div>
                            <div>
                            
                                
                            </div>
                        </div>

                        <div style = {{border : '0.5px solid #F0f0f0', height : '81px',
                            marginLeft : '6px', marginRight :'6px'}}/>

                        <div style={{display : 'flex', width :'165px'}}>
                            <div style={{width : '184px',marginBottom : '4px',textAlign: 'left', fontSize:'12px', fontWeight : 'normal', display :'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            {categoryName} ({restaurant})
                                <div style={{display : 'flex',justifyContent:'flex-start' , alignItems :'center'}}>
                                <img src={star} style={{width:'20px', height:'20px', margin : '5px'}} />
                                {averageRating !== null ? averageRating.toFixed(1) : "N/A"}                                
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
                    <div style={{color : '#444444', fontSize : '12px', marginBottom : '12px', display:'flex', gap:'5px'}}>
                        추천
                        {recommendCount ? (
        <div>{recommendCount.true_count}
        </div>
      ) : (
        <p>불러오는 중...</p>
      )}
                    </div>
                    <div style={{border : isRecommended === true ?  '2px solid #134B84' : '1px solid #F0F0F0', 
                    fontWeight : isRecommended === true ?  'bold' : 'normal',
                    color : isRecommended === true ?  '#134B84' : '#6A6A6A',
                    width:'124px', height :'104px', borderRadius : '12px',
                    cursor : 'pointer',
                        display : 'flex', justifyContent : 'center', alignItems : 'center', gap:'8px', boxShadow : '0 0px 20px rgba(0,0,0,0.1)'
                    }} onClick={() => handleRecommendClick(true)}>
                        <img 
                        src={
                            isRecommended === true ?   RecommendClick // 추천 상태일 때의 이미지
                            : Recommend // 추천되지 않은 상태일 때의 이미지
                        }
                        style={{width:'48px', height : '48px'}}/>
                        <div style={{fontSize:'14px'}}>추천</div>
                    </div>
                </div>
                <div className='bad' style={{width:'124px', height :'134px', display: 'flex', flexDirection : 'column',justifyContent : 'center', alignItems : 'center'}}>
                    <div style={{color : '#444444', fontSize : '12px', marginBottom : '12px',display :'flex', gap:'5px'}}>
                        비추천
                        {recommendCount ? (
        <div>{recommendCount.false_count}
        </div>
      ) : (
        <p>불러오는 중...</p>
      )}
                    </div>
                    <div style={{border : isRecommended === false ? '2px solid #134B84' : '1px solid #F0F0F0', 
                    color : isRecommended === false ? '#134B84' : '#6A6A6A',
                    fontWeight : isRecommended === false ? 'bold' : 'normal',
                    width:'124px', height :'104px', borderRadius : '12px',
                    cursor : 'pointer',
                        display : 'flex', justifyContent : 'center', alignItems : 'center', gap:'8px', boxShadow : '0 0px 20px rgba(0,0,0,0.1)'
                    }} onClick={() => handleRecommendClick(false)}>
                        <img 
                        src={
                            isRecommended === false ? NoRecommendClicked // 추천 상태일 때의 이미지
                            : NoRecommend // 추천되지 않은 상태일 때의 이미지
                        }
                        style={{width:'48px', height : '48px'}}/>
                        <div style={{fontSize:'14px'}}>비추천</div>
                    </div>
                </div>
            </div>

            <div className='reviewButton' style={{padding : '8px', cursor :'pointer'}} onClick={openModal}>
    <div style={{width : '100%', height : '48px', backgroundColor : '#134B84',
        borderRadius : '4px', display :'flex', alignItems : 'center', justifyContent :'center', gap : '4px',
        cursor: ratings.every(rating => rating > 0) ? 'pointer' : 'not-allowed',
    }} onClick={ratings.every(rating => rating > 0) ? submitReview : undefined}>
        <img src ={Review} style={{width :'20px', height : '20px'}}/>
        <div style={{color :'white', fontWeight :'bold', fontSize :'12px'}}  >
            리뷰하기
        </div>
    </div>
</div>
<MainModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menuData={menuData}
      />      </div>

  );
};
