import Button from "../../common/Button";

export default function TalkDetail() {
  return (
    <div className="px-8 py-6 border border-amber-600 bg-[#141414]/80">
      <div className="wrapper">
        {/* 뒤로가기버튼 */}

        {/* 유저정보 + 게시글 등록 날짜 + 팔로우버튼/메뉴버튼 */}
        <div className="flex justify-between items-start">
          <div className="flex gap-[22px] items-center">
            {/* 유저아이콘 */}
            <div className="w-[40px] h-[40px] bg-amber-900 rounded-full"></div>
            {/* 유저이름, 게시글 등록 날짜 */}
            <div>
              <h3 className="font-semibold">갤럭시</h3>
              <p className="text-[#696969] font-light text-sm">
                2025년 6월 1일 23:45
              </p>
            </div>
          </div>
          {/* 팔로우버튼/메뉴버튼 */}
          <Button className="text-[12px] px-4 py-[5px]">+ FOLLOW</Button>
        </div>

        {/* 게시글 */}
        <section>
          {/* 제목 */}
          <h3>입문하고 싶어서 기웃기웃</h3>

          {/* 내용 */}
          <div>
            <p>
              끓는 공자는 것이다 뿐이다 우리 바이며 군영과 어디 들어 스며들어
              크고 때에 청춘 천고에 기관같이 그리하였는가 일월과 따뜻한 얼음
              커다란 투명하되 그들은 내려온 같이 소금이라 피고 청춘의 불러
              피부가 평화스러운 운다 봄바람이다 속에 새 꾸며 보이는 설레는 이는
              생명을 피가 수 풍부하게 그러므로 두기 시대를 낙원을 하여도
              피어나는 구하지 얼마나 웅대한 끓는다 실현에 전인 위하여서 산야에
              피어나기 있는 그림자는 생의 석가는 하였으며 이상의 하는 위하여 이
              죽음이 과실이 기쁘며 품고 감동하기 무엇을 쉽고 많이 것은 사막이다
              무엇이 그것은 방황하여도.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
