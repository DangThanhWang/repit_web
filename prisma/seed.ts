// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log(`🌱 Starting database seeding...`);

  // Hash password for all demo users
  const hashedPassword = await bcrypt.hash("password123", 10);

  try {
    // Clean existing data (in correct order due to foreign key constraints)
    console.log("🧹 Cleaning existing data...");
    await prisma.flashcardProgress.deleteMany();
    await prisma.flashcard.deleteMany();
    await prisma.flashcardSet.deleteMany();
    await prisma.membership.deleteMany();
    await prisma.course.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    // Create demo users
    console.log("👥 Creating demo users...");
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: "alice@repit.com",
          password: hashedPassword,
          name: "Alice Johnson",
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-07-15"),
        },
      }),
      prisma.user.create({
        data: {
          email: "bob@repit.com",
          password: hashedPassword,
          name: "Bob Smith",
          createdAt: new Date("2024-02-10"),
          updatedAt: new Date("2024-07-14"),
        },
      }),
      prisma.user.create({
        data: {
          email: "charlie@repit.com",
          password: hashedPassword,
          name: "Charlie Brown",
          createdAt: new Date("2024-03-05"),
          updatedAt: new Date("2024-07-13"),
        },
      }),
      prisma.user.create({
        data: {
          email: "diana@repit.com",
          password: hashedPassword,
          name: "Diana Prince",
          createdAt: new Date("2024-04-01"),
          updatedAt: new Date("2024-07-12"),
        },
      }),
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create courses
    console.log("🎓 Creating courses...");
    const courses = await Promise.all([
      prisma.course.create({
        data: {
          name: "English for Beginners",
          description: "Start your English learning journey with basic vocabulary and grammar",
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-07-01"),
        },
      }),
      prisma.course.create({
        data: {
          name: "Business English Mastery",
          description: "Professional English skills for the workplace",
          createdAt: new Date("2024-02-01"),
          updatedAt: new Date("2024-07-01"),
        },
      }),
      prisma.course.create({
        data: {
          name: "Advanced Conversation",
          description: "Improve your fluency with advanced speaking techniques",
          createdAt: new Date("2024-03-01"),
          updatedAt: new Date("2024-07-01"),
        },
      }),
    ]);

    console.log(`✅ Created ${courses.length} courses`);

    // Create memberships
    console.log("🎯 Creating course memberships...");
    const memberships = [
      // Alice - member of beginners and business
      { userId: users[0].id, courseId: courses[0].id, role: "member" },
      { userId: users[0].id, courseId: courses[1].id, role: "member" },
      
      // Bob - admin of beginners, member of advanced
      { userId: users[1].id, courseId: courses[0].id, role: "admin" },
      { userId: users[1].id, courseId: courses[2].id, role: "member" },
      
      // Charlie - member of all courses
      { userId: users[2].id, courseId: courses[0].id, role: "member" },
      { userId: users[2].id, courseId: courses[1].id, role: "member" },
      { userId: users[2].id, courseId: courses[2].id, role: "member" },
      
      // Diana - admin of business and advanced
      { userId: users[3].id, courseId: courses[1].id, role: "admin" },
      { userId: users[3].id, courseId: courses[2].id, role: "admin" },
    ];

    for (const membership of memberships) {
      await prisma.membership.create({ data: membership });
    }

    console.log(`✅ Created ${memberships.length} memberships`);

    // Create flashcard sets with flashcards
    console.log("📚 Creating flashcard sets...");

    // Alice's flashcard sets
    const aliceSet1 = await prisma.flashcardSet.create({
      data: {
        title: "Essential Daily Vocabulary",
        description: "Common words used in everyday conversations",
        userId: users[0].id,
        cardCount: 0,
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-07-10"),
        flashcards: {
          create: [
            { question: "Hello", answer: "Xin chào", example: "Hello, how are you today?" },
            { question: "Thank you", answer: "Cảm ơn", example: "Thank you for your help!" },
            { question: "Please", answer: "Xin lỗi / Làm ơn", example: "Please pass me the salt." },
            { question: "Sorry", answer: "Xin lỗi", example: "Sorry, I'm late!" },
            { question: "Excuse me", answer: "Xin lỗi", example: "Excuse me, where is the bathroom?" },
            { question: "Good morning", answer: "Chào buổi sáng", example: "Good morning, everyone!" },
            { question: "Good night", answer: "Chúc ngủ ngon", example: "Good night, see you tomorrow." },
            { question: "How much?", answer: "Bao nhiêu tiền?", example: "How much does this cost?" },
            { question: "Where", answer: "Ở đâu", example: "Where do you live?" },
            { question: "When", answer: "Khi nào", example: "When will you arrive?" },
          ]
        }
      },
    });

    const aliceSet2 = await prisma.flashcardSet.create({
      data: {
        title: "Food and Dining",
        description: "Vocabulary related to food, restaurants, and dining experiences",
        userId: users[0].id,
        cardCount: 0,
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-07-08"),
        flashcards: {
          create: [
            { question: "Restaurant", answer: "Nhà hàng", example: "Let's go to a nice restaurant for dinner." },
            { question: "Menu", answer: "Thực đơn", example: "Can I see the menu, please?" },
            { question: "Order", answer: "Đặt món", example: "I would like to order pizza." },
            { question: "Delicious", answer: "Ngon", example: "This cake is delicious!" },
            { question: "Spicy", answer: "Cay", example: "I don't like spicy food." },
            { question: "Sweet", answer: "Ngọt", example: "This dessert is too sweet for me." },
            { question: "Fresh", answer: "Tươi", example: "These vegetables are very fresh." },
            { question: "Bill", answer: "Hóa đơn", example: "Can we have the bill, please?" },
          ]
        }
      },
    });

    // Bob's flashcard sets
    const bobSet1 = await prisma.flashcardSet.create({
      data: {
        title: "Business English Essentials",
        description: "Key vocabulary for professional communication",
        userId: users[1].id,
        cardCount: 0,
        createdAt: new Date("2024-02-15"),
        updatedAt: new Date("2024-07-12"),
        flashcards: {
          create: [
            { question: "Meeting", answer: "Cuộc họp", example: "We have a meeting at 2 PM." },
            { question: "Presentation", answer: "Bài thuyết trình", example: "I need to prepare my presentation." },
            { question: "Deadline", answer: "Hạn chót", example: "The deadline for this project is Friday." },
            { question: "Report", answer: "Báo cáo", example: "Please submit your report by Monday." },
            { question: "Budget", answer: "Ngân sách", example: "We need to discuss the budget for next quarter." },
            { question: "Client", answer: "Khách hàng", example: "Our client is very satisfied with our service." },
            { question: "Schedule", answer: "Lịch trình", example: "What's your schedule for tomorrow?" },
            { question: "Colleague", answer: "Đồng nghiệp", example: "My colleague will help you with this task." },
            { question: "Professional", answer: "Chuyên nghiệp", example: "She always maintains a professional attitude." },
            { question: "Negotiate", answer: "Đàm phán", example: "We need to negotiate the contract terms." },
          ]
        }
      },
    });

    const bobSet2 = await prisma.flashcardSet.create({
      data: {
        title: "Travel English",
        description: "Essential phrases for traveling and tourism",
        userId: users[1].id,
        cardCount: 0,
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date("2024-07-09"),
        flashcards: {
          create: [
            { question: "Airport", answer: "Sân bay", example: "I'll pick you up at the airport." },
            { question: "Flight", answer: "Chuyến bay", example: "My flight is delayed by two hours." },
            { question: "Hotel", answer: "Khách sạn", example: "We're staying at a hotel near the beach." },
            { question: "Passport", answer: "Hộ chiếu", example: "Don't forget to bring your passport." },
            { question: "Luggage", answer: "Hành lý", example: "My luggage is too heavy." },
            { question: "Tourist", answer: "Du khách", example: "This area is popular with tourists." },
            { question: "Map", answer: "Bản đồ", example: "Do you have a map of the city?" },
            { question: "Directions", answer: "Chỉ đường", example: "Can you give me directions to the museum?" },
          ]
        }
      },
    });

    // Charlie's flashcard sets  
    const charlieSet1 = await prisma.flashcardSet.create({
      data: {
        title: "Academic English",
        description: "Vocabulary for academic writing and research",
        userId: users[2].id,
        cardCount: 0,
        createdAt: new Date("2024-03-10"),
        updatedAt: new Date("2024-07-11"),
        flashcards: {
          create: [
            { question: "Research", answer: "Nghiên cứu", example: "I'm doing research on climate change." },
            { question: "Analysis", answer: "Phân tích", example: "The analysis shows interesting results." },
            { question: "Hypothesis", answer: "Giả thuyết", example: "Our hypothesis was proven correct." },
            { question: "Evidence", answer: "Bằng chứng", example: "We need more evidence to support this theory." },
            { question: "Conclusion", answer: "Kết luận", example: "In conclusion, the experiment was successful." },
            { question: "Reference", answer: "Tham khảo", example: "Please include all references in your paper." },
            { question: "Academic", answer: "Học thuật", example: "She has an excellent academic record." },
            { question: "Scholar", answer: "Học giả", example: "He is a respected scholar in his field." },
            { question: "Thesis", answer: "Luận án", example: "I'm writing my master's thesis." },
            { question: "Publication", answer: "Xuất bản", example: "His research was accepted for publication." },
          ]
        }
      },
    });

    // Diana's flashcard sets
    const dianaSet1 = await prisma.flashcardSet.create({
      data: {
        title: "Technology Terms",
        description: "Modern technology and digital vocabulary",
        userId: users[3].id,
        cardCount: 0,
        createdAt: new Date("2024-04-05"),
        updatedAt: new Date("2024-07-13"),
        flashcards: {
          create: [
            { question: "Software", answer: "Phần mềm", example: "This software is very user-friendly." },
            { question: "Hardware", answer: "Phần cứng", example: "We need to upgrade our hardware." },
            { question: "Internet", answer: "Internet", example: "The internet connection is very fast here." },
            { question: "Website", answer: "Trang web", example: "Our company's website needs updating." },
            { question: "Database", answer: "Cơ sở dữ liệu", example: "All customer information is stored in the database." },
            { question: "Application", answer: "Ứng dụng", example: "This mobile application is very popular." },
            { question: "Security", answer: "Bảo mật", example: "Online security is very important." },
            { question: "Download", answer: "Tải xuống", example: "You can download the app for free." },
            { question: "Upload", answer: "Tải lên", example: "Please upload your documents to the cloud." },
            { question: "Digital", answer: "Kỹ thuật số", example: "We live in a digital age." },
          ]
        }
      },
    });

    // Update card counts for all sets
    const allSets = [aliceSet1, aliceSet2, bobSet1, bobSet2, charlieSet1, dianaSet1];
    
    for (const set of allSets) {
      const cardCount = await prisma.flashcard.count({
        where: { setId: set.id }
      });
      
      await prisma.flashcardSet.update({
        where: { id: set.id },
        data: { cardCount }
      });
    }

    console.log(`✅ Created ${allSets.length} flashcard sets with flashcards`);

    // Create progress records
    console.log("📈 Creating learning progress...");
    const progressData = [
      // Alice's progress
      { userId: users[0].id, setId: aliceSet1.id, learned: 7, lastReviewed: new Date("2024-07-10") },
      { userId: users[0].id, setId: aliceSet2.id, learned: 5, lastReviewed: new Date("2024-07-08") },
      
      // Bob's progress  
      { userId: users[1].id, setId: bobSet1.id, learned: 8, lastReviewed: new Date("2024-07-12") },
      { userId: users[1].id, setId: bobSet2.id, learned: 6, lastReviewed: new Date("2024-07-09") },
      
      // Charlie's progress
      { userId: users[2].id, setId: charlieSet1.id, learned: 4, lastReviewed: new Date("2024-07-11") },
      
      // Diana's progress
      { userId: users[3].id, setId: dianaSet1.id, learned: 9, lastReviewed: new Date("2024-07-13") },
      
      // Cross-user progress (users studying others' public sets)
      { userId: users[2].id, setId: aliceSet1.id, learned: 3, lastReviewed: new Date("2024-07-05") },
      { userId: users[3].id, setId: bobSet1.id, learned: 5, lastReviewed: new Date("2024-07-07") },
    ];

    for (const progress of progressData) {
      await prisma.flashcardProgress.create({ data: progress });
    }

    console.log(`✅ Created ${progressData.length} progress records`);

    // Display summary
    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   👥 Users: ${users.length}`);
    console.log(`   🎓 Courses: ${courses.length}`);
    console.log(`   🎯 Memberships: ${memberships.length}`);
    console.log(`   📚 Flashcard Sets: ${allSets.length}`);
    console.log(`   📈 Progress Records: ${progressData.length}`);
    
    console.log("\n🔑 Demo Login Credentials:");
    console.log("   Email: alice@repit.com, bob@repit.com, charlie@repit.com, diana@repit.com");
    console.log("   Password: password123");

    console.log("\n🔗 Test URLs:");
    console.log("   • Dashboard: http://localhost:3000/dashboard");
    console.log("   • Flashcards: http://localhost:3000/flashcards");
    console.log("   • Create Set: http://localhost:3000/flashcards/new");

  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Database connection closed");
  });