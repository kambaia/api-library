import Connection from "mysql/lib/Connection"

export class Tables {
    private connection: Connection;
    constructor(connection: Connection){
        this.connection = connection;
        this.createTablePermission();
        this.createTableUser();
        this.createTableCategory();
        this.createTableSocialMedia();
        this.createTableAuthor();
        this.createTableDocument();
        this.createTableAuthorAndBook();
        this.createTableBook();
        this.createTableFavoriteAndBook()
    }
    
    public createTablePermission(): void{
        const sql = 'CREATE TABLE IF NOT EXISTS tb_permissions(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, livel INT NOT NULL, role VARCHAR(100)  NULL, type VARCHAR(150) NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);'
        this.connection.query(sql, (erro: any) => {
            if(erro) {
                console.log(erro)
            }
        })
    }

    public createTableUser(): void{
        const sql = 'CREATE TABLE IF NOT EXISTS tb_users(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, userProfile VARCHAR(200) NULL, nameProfile VARCHAR(100)  NULL, email VARCHAR(150) NOT NULL, userName CHAR(5) NOT NULL, firstName VARCHAR(100) NULL, lastName VARCHAR(100) NOT NULL, password VARCHAR(200) NOT NULL, phoneNumber VARCHAR(20) NOT NULL, active boolean NULL, permissionId INT NULL,favoriteBookId INT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, foreign key (permissionId) references tb_permissions(id));'
        this.connection.query(sql, (erro: any) => {
            if(erro) {
                console.log(erro)
            }
        })
    }
    

    public createTableCategory(): void{
        const sql = 'CREATE TABLE IF NOT EXISTS tb_categorys(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, category VARCHAR(200) NULL,  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);'
        this.connection.query(sql, (erro: any) => {
            if(erro) {
                console.log(erro)
            }
        })
    }

    public createTableAuthor(): void{
        const sql = 'CREATE TABLE IF NOT EXISTS tb_authors(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, authorProfile VARCHAR(200) NULL, nameProfile VARCHAR(100)  NULL, authorName VARCHAR(100) NOT NULL, birthdate CHAR(20) NOT NULL, age VARCHAR(5) NULL, biography VARCHAR(200) NOT NULL, socialMediaId INT NULL, followersId  INT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, foreign key (socialMediaId) references tb_socialmedias(id), foreign key (followersId) references tb_users(id))';
        this.connection.query(sql, (erro: any) => {
            if(erro) {
                console.log(erro)
            }
        })
    }
    
    public createTableSocialMedia(): void{
        const sql = 'CREATE TABLE IF NOT EXISTS tb_socialmedias(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NULL, link VARCHAR(250)  NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);'
        this.connection.query(sql, (erro: any) => {
            if(erro) {
                console.log(erro)
            }
        })
    }
    public createTableBook(): void{
        const sql = 'CREATE TABLE IF NOT EXISTS tb_books(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, cover VARCHAR(200) NULL, nameCover VARCHAR(100)  NULL, title VARCHAR(200) NOT NULL, publishLocation CHAR(5) NOT NULL, issueDate VARCHAR(100) NULL, PublishingCompany VARCHAR(100) NOT NULL, language VARCHAR(200) NOT NULL, bookCode VARCHAR(20) NOT NULL, active Boolean NULL, boxSize INT NULL, numberOfpage INT NULL, yearOfLaunch  VARCHAR(20) NOT NULL, textReading VARCHAR(20) NOT NULL, categoryId INT NULL, documentId INT NULL, representativeUserId INT NULL, authorId INT NULL,  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, foreign key (categoryId) references tb_categorys(id), foreign key (documentId) references tb_documents(id),foreign key (authorId) references tb_authors(id), foreign key (representativeUserId) references tb_users(id));'
        this.connection.query(sql, (erro: any) => {
            if(erro) {
                console.log(erro)
            }
        })
    }
       
    public createTableDocument(): void{
        const sql = 'CREATE TABLE IF NOT EXISTS tb_documents(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, format VARCHAR(50) NOT NULL, size INT NOT NULL, url VARCHAR(250) NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);';
        this.connection.query(sql, (erro: any) => {
            if(erro) {
                console.log(erro)
            }
        })
    }

    public createTableAuthorAndBook(): void{
        const sql = 'CREATE TABLE IF NOT EXISTS tb_author_and_book(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, bookId INT NOT NULL, authorId INT NOT NULL, foreign key (authorId) references tb_authors(id), foreign key (bookId) references tb_books(id))';
        this.connection.query(sql, (erro: any) => {
            if(erro) {
                console.log(erro)
            }
        })
    }

    public createTableFavoriteAndBook(): void{
        const sql = 'CREATE TABLE IF NOT EXISTS tb_favorite_book(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, bookId INT NOT NULL, userId INT NOT NULL, foreign key (userId) references tb_users(id), foreign key (bookId) references tb_books(id))';
        this.connection.query(sql, (erro: any) => {
            if(erro) {
                console.log(erro)
            }
        })
    }

}