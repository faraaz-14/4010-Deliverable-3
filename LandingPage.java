package frontEnd;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class LandingPage {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		// Creating the opening window
		JFrame frame = new JFrame ("Quickwhip.com");
		frame.setLayout (null);
		
		//Adding the label to the frame + the logo
		JLabel logo;
		frame.add(logo = new JLabel (new ImageIcon ("/Users/faraazabdul/Desktop/QuickWhipLogo.png")));
		logo.setLayout(null);
		logo.setBounds(400, 10, 800, 400);
		
		//Adding a search bar
		JButton searchButton = new JButton ("Search");
		JTextField searchBar = new JTextField(16);
		searchButton.setBounds(1120, 420, 70, 30);
		searchBar.setBounds(465, 420, 660, 30);
		
		frame.add(searchButton);
		frame.add(searchBar);
		
		//Setting the size of the frame
		frame.setSize(1600, 1200);
		
		//Close
		frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		
		//Visibility
		frame.setVisible(true);
		
		
	}

}
