show dbs

db.posts.insert({"title": "First Post", CreatedAt : new Date()})
db.posts.insertMany([{
	"title": "Learning MongoDB",
	"content": "몽고DB를 학습합니다.",
	createdAt: new Date(),
	hit : 100
}, {
	"title": "Python Programming",
	createdAt: new Date(),
	hit: 10
}, {
	"title": "Oracle Database",
	createdAt: new Date(),
	hit : 30
}])

// content필드 update
// modifiedAt 필드 세팅
db.posts.update(
	{"title": "First Post"},
	{$set: {
                    content: "첫번째 포스트",
                    modifiedAt: new Date()
		}
	}
)

db.posts.findOne()
        
// .remove() : 문서 삭제
db.posts.find()

// title이 New Document인 문서 삭제
post = db.posts.findOne({"title": "New Document"})
db.posts.remove(post)

// 조건 연산
/*
같다(==): {필드 : 값}
크다(>): {필드 : { $gt : 값} }
크거나 같다(>=): { 필드 : { $gte: 값}}
작다 (<): { 필드: { $lt: 값}}
작거나 같다(<=): {필드 :{$lte: 값}}
같지 않다 (!=): { 필드 : { $ne: 값}}
*/

// hit 가 10인 문서들
db.posts.find({hit: 10})

// hit가 10이 아닌 문서들
db.posts.find({hit : { $ne : 10}})

// hit가 50 이상인 문서들
db.posts.find({hit : { $gte: 50} })

// $and, $or : 논리 조합의 조건들을 배열로 전달
// 문서 중 hit 수가 20 ~ 50 사이인 문서들 검색
db.posts.find({
	$and: [
		{ hit: { $gte: 20} },
		{ hit: { $lte: 50} }
	]
})

// 문서 중 hit 수가 20이하 이거나 50 이상인 문서들 검색 (or)
db.posts.find({
	$or: [
		{ hit: { $lte: 20} },
		{ hit: { $gte: 50} }
	]
})

// 프로젝션
// find 메서드의 두번 째 객체로 출력 필드를 제어
//	 1 : 출력, 0 : 비출력
// posts 컬렉션에서 title, content, hit 필드 출력
db.posts.find({},
	{ "_id": 0, "title": 1, "content": 1, "hit": 1})
        
// 출력의 제한
//	.skip : 건너뛰기
//	.limit : 출력 개수

// posts 컬렉션에서 전체문서 대상,
//	title, hit 필드 출력, _id는 가리기
//	2 개 건너뛰고, 4개 출력
db.posts.find({},
	{ "title": 1, "hit": 1, "_id": 0}).limit(4).skip(2)
        
db.posts.find({},
	{ "title": 1, "hit": 1}).sort({ "hit": 1}) // 오름차순

// hit 필드의 내림차순으로 정렬
db.posts.find({},
	{ "title": 1, "hit": 1}).sort({ "hit": -1}) // 내림차순