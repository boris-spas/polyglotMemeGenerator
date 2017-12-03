// package PolyglotMemeGenerator;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.sqlite.JDBC;
import java.util.HashMap;


public class DBManager {

	private final static String ID_COL = "id";
	private final static String IMG_COL = "image";
	private final static String TABLE_TITLE = "templateImages";

	public static Connection conn;
	public static Statement statement;
	public static ResultSet resSet;

	dpublic DBManager(String filename) {
		conn = null;
		init(filename);
	}

	public DBManager() {
		conn = null;
		String filename = "images.db";
		init(filename);
	}

	private void init(String filename) {
		if (conn != null) {
			conn.close();
		}
		connect(filename);
		createTable();
	}

	private void createTable() {
		assert conn != null;
		statement = conn.createStatement();
		statement.execute(String.format("CREATE TABLE if not exists '%s' ('%s' INTEGER PRIMARY KEY AUTOINCREMENT, '%s' text not null);",
										TABLE_TITLE, ID_COL, IMG_COL));
	}

	private void connect(String filename) {
		try {
			Class.forName("org.sqlite.JDBC");

			conn = DriverManager.getConnection("jdbc:sqlite:" + filename);
			System.out.println("Connection to database established");
		} catch (ClassNotFoundException cnf_e) {
			cnf_e.printStackTrace();
		} catch (SQLException sql_e) {
			sql_e.printStackTrace();
		}
	}

	public synchronized void insertImage(String base64String) {
		assert (conn != null) && (statement != null);
		statement.execute(String.format("INSERT INTO '%s' ('%s') VALUES ('%s');", TABLE_TITLE, IMG_COL, base64String));
	}

	public String getImagebyId(int id) {
		assert (conn != null) && (statement != null);
		resSet = statement.executeQuery(String.format("SELECT * FROM %s WHERE %s = %d;", TABLE_TITLE, ID_COL, id));
		String resultJSON = "{%d:%s}";
		while(resSet.next())
		{
			int id = resSet.getInt(ID_COL);
			String image = resSet.getString(IMG_COL);
			resultJSON = String.format(resultJSON, id, image);
		}
		return resultJSON;
	}

	public String getNImages(int n) {
		assert (conn != null) && (statement != null) && (n > 0);
		resSet = statement.executeQuery(String.format("SELECT * FROM %s LIMIT %d;", TABLE_TITLE, ID_COL, n));
		String resultJSON = "{images:[";
		while(resSet.next())
		{
			String imageJSON = "{%d:%s}";
			int id = resSet.getInt(ID_COL);
			String image = resSet.getString(IMG_COL);
			imageJSON = String.format(imageJSON, id, image);
			resultJSON += imageJSON + ","
		}
		resultJSON = resultJSON.substring(0, resultJSON.length() - 1) + "]}";
		return resultJSON;
	}

	public static void main(String[] args) throws SQLException {
		new DBManager();
	}

}