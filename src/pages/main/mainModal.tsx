import { useState } from 'react';
import close from '@assets/main/close.webp';
import { submitReview } from '@apis/mainApi';

interface MainModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: any[];
}

export const MainModal = ({ isOpen, onClose, menuData }: MainModalProps) => {
  const [ratings, setRatings] = useState<number[]>(Array(menuData.length).fill(0)); // 각 음식별 별점
  const [reviewIds, setReviewIds] = useState<(number | undefined)[]>(Array(menuData.length).fill(undefined));

  console.log(setReviewIds);
  if (!isOpen) return null;

  // 별점 변경 처리 함수
  const handleRatingChange = (index: number, rating: number) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings); // 상태 업데이트
    console.log(`음식 ${menuData[index].name}의 별점: ${rating}`);
    console.log('현재 선택된 별점들:', newRatings);
  };

  // -------- StarRating 컴포넌트 ---------
  const StarRating = ({ onRatingChange, initialRating }: { onRatingChange: (rating: number) => void, initialRating: number }) => {
    const [currentRating, setCurrentRating] = useState<number>(initialRating);

    const handleStarClick = (rating: number) => {
      setCurrentRating(rating); // 별 클릭 시, 1~5 사이의 값으로 선택
      const calculatedRating = rating * 2; // 별 1개당 2점으로 계산
      onRatingChange(calculatedRating); // 부모로 변경된 별점 전달 (2배로 계산된 별점)
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: 'pointer',
              fontSize: '52px', // 별 크기 설정
              color: star <= currentRating ? '#F0F900' : '#9E9E9E', // 선택된 별은 금색으로 표시
            }}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // 서버로 리뷰 제출 함수
  const handleSubmitReview = async () => {
    try {
      for (let i = 0; i < menuData.length; i++) {
        const foodId = menuData[i].id;
        const rating = ratings[i];
        const reviewId = reviewIds[i];
        
  
        // 리뷰가 있다면 PUT 요청, 없다면 POST 요청
        const response = await submitReview(foodId, rating, reviewId);
  
        if (response) {
          console.log("리뷰 처리 성공:", response);
        } else {
          console.error("리뷰 처리 실패");
        }
      }
    } catch (error) {
      console.error("리뷰 제출 중 오류 발생:", error);
    }
  };
  

  // 모든 음식에 대해 별점이 선택되었는지 확인하는 함수
  const isAllRatingsSelected = ratings.every((rating) => rating > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: '0', bottom: '0', width: '100%' }} onClick={onClose}>
      <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '400px', position: 'fixed', bottom: '54px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', padding: '8px' }} onClick={(event) => event.stopPropagation()}>
        <div style={{ margin: '8px', display: 'flex', width: '344px', height: '48px', alignItems: 'center' }}>
          <img src={close} style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={onClose} />
          <div style={{ fontWeight: 'bold', justifyContent: 'center', display: 'flex', flex: 1 }}>
            리뷰작성
          </div>
        </div>

        <div>
          {menuData.map((item, index) => (
            <li key={index} style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ textAlign: 'left', fontSize: '14px', fontWeight: 'normal' }}>"{item.name}" (은)는 어떠셨나요?</div>
              <div style={{ margin: '0' }}>
              <StarRating
                  initialRating={ratings[index] / 2} // 초기 별점 값을 ratings에서 가져옴
                  onRatingChange={(rating) => handleRatingChange(index, rating)}
                />
              </div>
            </li>
          ))}
        </div>

        <div className='summitButton' style={{ height: '48px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0', backgroundColor: isAllRatingsSelected ? '#134B84' : '#9E9E9E' }}>
        <button onClick={handleSubmitReview} disabled={!isAllRatingsSelected} style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>
          리뷰 제출
        </button>

        </div>
      </div>
    </div>
  );
};
