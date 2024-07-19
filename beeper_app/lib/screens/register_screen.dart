import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final AuthService _authService = AuthService();
  String _username = '';
  String _firstName = '';
  String _lastName = '';
  String _email = '';
  String _password = '';
  String _role = '';
  String _department = '';

  void _register() async {
    if (_formKey.currentState!.validate()) {
      try {
        await _authService.register(_username, _firstName, _lastName, _email, _password, _role, _department);
        Navigator.pushReplacementNamed(context, '/login');
      } catch (error) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Registration failed: $error')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Register')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              TextFormField(
                decoration: const InputDecoration(labelText: 'Username'),
                validator: (value) => value!.isEmpty ? 'Please enter your username' : null,
                onChanged: (value) {
                  setState(() {
                    _username = value;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'First Name'),
                validator: (value) => value!.isEmpty ? 'Please enter your first name' : null,
                onChanged: (value) {
                  setState(() {
                    _firstName = value;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Last Name'),
                validator: (value) => value!.isEmpty ? 'Please enter your last name' : null,
                onChanged: (value) {
                  setState(() {
                    _lastName = value;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Email'),
                validator: (value) => value!.isEmpty ? 'Please enter your email' : null,
                onChanged: (value) {
                  setState(() {
                    _email = value;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Password'),
                validator: (value) => value!.isEmpty ? 'Please enter your password' : null,
                obscureText: true,
                onChanged: (value) {
                  setState(() {
                    _password = value;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Role'),
                validator: (value) => value!.isEmpty ? 'Please enter your role' : null,
                onChanged: (value) {
                  setState(() {
                    _role = value;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Department'),
                validator: (value) => value!.isEmpty ? 'Please enter your department' : null,
                onChanged: (value) {
                  setState(() {
                    _department = value;
                  });
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(onPressed: _register, child: const Text('Register')),
            ],
          ),
        ),
      ),
    );
  }
}
