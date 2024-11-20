import { useState } from 'react';
import close from '@assets/main/close.webp';
import { postRating } from '@apis/mainApi';
interface MenuItem {
  menu_id: number;  // 음식 ID
  name: string;      // 음식 이름
}

interface MainModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuItem[]; // 음식 데이터를 담는 배열
  ratings: { [key: number]: number };
  onRatingChange: (foodId: number, rating: number) => void;
  onSubmit: () => void;
}

export const MainModal = ({ isOpen, onClose, menuData, ratings, onRatingChange, onSubmit }: MainModalProps) => {
  if (!isOpen) return null; // isOpen이 false이면 모달을 렌더링하지 않음

  // -------- StarRating 컴포넌트 ---------
  const StarRating = ({ onRatingChange, initialRating }: { onRatingChange: (rating: number) => void; initialRating: number }) => {
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
              fontSize: '60px', // 별 크기 설정
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

  // 모든 음식에 대해 별점이 선택되었는지 확인하는 함수
  const isAllRatingsSelected = Object.values(ratings).every((rating) => rating > 0);
  

  // 리뷰 제출 시 호출되는 함수
  const handleSubmitReview = async () => {
    // 모든 음식에 대해 별점 데이터를 백엔드로 보내기
    const ratingRequests = Object.entries(ratings).map(([foodId, rating]) => ({
      food: parseInt(foodId), // foodId string을 number로 변환
      rating: rating, // 2배로 계산된 별점
    }));

    for (let i = 0; i < ratingRequests.length; i++) {
      const ratingData = ratingRequests[i];

      // API 호출: 별점 데이터 전송
      try {
        await postRating(ratingData); // postRating 함수는 백엔드 API로 별점 전송
        console.log(`음식 ID ${ratingData.food}에 대한 리뷰가 성공적으로 제출되었습니다.`);
      } catch (error) {
        console.error(`음식 ID ${ratingData.food}에 대한 리뷰 제출에 실패했습니다.`, error);
      }
    }

    onSubmit(); // 리뷰 제출 후 부모 컴포넌트에서 처리
    onClose(); // 모달 닫기
  };
  console.log("Is all ratings selected:", isAllRatingsSelected);
console.log("Ratings state:", ratings);


  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: '0',
        bottom: '0',
        width: '100%',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          width: '100%',
          maxWidth: '400px',
          position: 'fixed',
          bottom: '65px',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '8px',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{ margin: '8px', display: 'flex', width: '344px', height: '48px', alignItems: 'center' }}>
          <img
            src={close}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            onClick={onClose}
          />
          <div
            style={{
              fontWeight: 'bold',
              justifyContent: 'center',
              display: 'flex',
              flex: 1,
            }}
          >
            리뷰작성
          </div>
        </div>

        <div>
          <ul>
            {menuData.map((item, index) => (
              <li key={index} style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ textAlign: 'left', fontSize: '14px', fontWeight: 'normal' }}>
                  "{item.name}" (은)는 어떠셨나요?
                </div>
                <div style={{ margin: '0' }}>
                  <StarRating
                    initialRating={ratings[item.menu_id] / 2} // 초기 별점 값을 ratings에서 가져옴 (2배로 계산된 별점)
                    onRatingChange={(rating) => onRatingChange(item.menu_id, rating)} // 부모로 별점 변경 전달
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="summitButton"
          onClick={handleSubmitReview}
          disabled={!isAllRatingsSelected}
          style={{
            height: '48px',
            width:'100%',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0',
            backgroundColor: isAllRatingsSelected ? '#134B84' : '#9E9E9E',            
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: isAllRatingsSelected ? 'pointer' : 'not-allowed'
          }}>
            리뷰 제출
        </button>
      </div>
    </div>
  );
};

