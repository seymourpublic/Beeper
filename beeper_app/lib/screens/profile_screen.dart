import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';
import '../services/auth_service.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  User? _user;
  final AuthService _authService = AuthService();

  @override
  void initState() {
    super.initState();
    _loadProfile();
  }

  void _loadProfile() async {
    User? user = await _authService.getCurrentUser();
    setState(() {
      _user = user;
    });
  }

  void _logout() async {
    await _authService.logout();
    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: _logout,
          ),
        ],
      ),
      body: _user == null
          ? Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text('Username: ${_user!.username}', style: TextStyle(fontSize: 20)),
                  SizedBox(height: 8),
                  Text('First Name: ${_user!.firstName}', style: TextStyle(fontSize: 20)),
                  SizedBox(height: 8),
                  Text('Last Name: ${_user!.lastName}', style: TextStyle(fontSize: 20)),
                  SizedBox(height: 8),
                  Text('Email: ${_user!.email}', style: TextStyle(fontSize: 20)),
                  SizedBox(height: 8),
                  Text('Role: ${_user!.role}', style: TextStyle(fontSize: 20)),
                  SizedBox(height: 8),
                  Text('Department: ${_user!.department}', style: TextStyle(fontSize: 20)),
                ],
              ),
            ),
    );
  }
}
