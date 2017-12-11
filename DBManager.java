// package PolyglotMemeGenerator;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.sqlite.JDBC;
import java.util.HashMap;
import java.io.InputStream;
import java.io.IOException;


import org.graalvm.polyglot.*;


public class DBManager {

	private final static String ID_COL = "id";
	private final static String IMG_COL = "image";
	private final static String TABLE_TITLE = "templateImages";
	private final static int    BLOB_SIZE = 1024 * 1024;

	public static Connection conn;
	public static Statement statement;
	public static ResultSet resSet;

	private static DBManager instance = new DBManager();

	private DBManager() {
		conn = null;
		String filename = "images.db";
		init(filename);
	}

	private void init(String filename) {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		connect(filename);
		createTable();
	}

	private void createTable() {
		assert conn != null;
		try {
			statement = conn.createStatement();
			statement.execute(String.format("CREATE TABLE if not exists '%s' ('%s' INTEGER PRIMARY KEY AUTOINCREMENT, '%s' blob not null);",
											TABLE_TITLE, ID_COL, IMG_COL));
		} catch (SQLException e) {
			e.printStackTrace();
		}
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

	public synchronized void insertImage(byte[] image) {
		assert (conn != null) && (statement != null);
		try {
			statement.execute(String.format("INSERT INTO '%s' ('%s') VALUES ('%s');", TABLE_TITLE, IMG_COL, image));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public HashMap<Integer, byte[]> getImagebyId(int id) {
		assert (conn != null) && (statement != null);
		HashMap<Integer, byte[]> result = new HashMap<>();
		try {
			resSet = statement.executeQuery(String.format("SELECT * FROM %s WHERE %s = %d;", TABLE_TITLE, ID_COL, id));
			while(resSet.next())
			{
				InputStream input = resSet.getBinaryStream(IMG_COL);
				byte[] imgBytes = new byte[BLOB_SIZE];
				input.read(imgBytes);
				int idVal = resSet.getInt(ID_COL);
				result.put(idVal, imgBytes);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
		return result;
	}

	// To test exception passing to js
	public HashMap<Integer, byte[]> getNImages(int n) throws SQLException {
		assert (conn != null) && (statement != null) && (n > 0);
		resSet = statement.executeQuery(String.format("SELECT * FROM %s LIMIT %d;", TABLE_TITLE, ID_COL, n));
		HashMap<Integer, byte[]> result = new HashMap<>();
		while(resSet.next())
		{
			int id = resSet.getInt(ID_COL);
			InputStream input = resSet.getBinaryStream(IMG_COL);
			byte[] imgBytes = new byte[BLOB_SIZE];
			result.put(id, imgBytes);
		}
		return result;
	}

	public static DBManager getInstance() {
		return instance;
	}

	public void greetings(String name) {
		System.out.println("Hi, " + name);
	}

	public static void main(String[] args) {
		Context context = Context.create();
		context.exportSymbol("DBManager", new DBManager());
	}

}