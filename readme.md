# Configuration
* Create a schema into MySql (will be used into the datasource definition).
* Download the [MySQL connector](http://www.mysql.com/downloads/connector/j/) and copy the jar `into tomcat/lib`
* Edit `tomcat/conf/context.xml`. Add a datasource into `<Context>`. Example:
```xml
    <Resource name="jdbc/cardTracker"
              auth="Container" type="javax.sql.DataSource"
              maxActive="100" maxIdle="30" maxWait="10000"
              username="mage" password="magepass"
              driverClassName="com.mysql.jdbc.Driver"
              url="jdbc:mysql://localhost:3306/cardtracker"/>
```
